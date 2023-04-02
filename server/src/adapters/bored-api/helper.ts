import axios, { AxiosRequestConfig, Method } from "axios";
import Logger from "../../utils/logger";

const BORED_API_BASE_URL = "https://www.boredapi.com/api";

/**
 * Helper function to make request to Bored API
 *
 * @param method - The request method
 * @param resourcePath - Destination resource path
 * @param body - Optional request body
 * @returns - Bored API raw response
 */
export async function request<Request, Response>(
  method: Method,
  resourcePath: string,
  body?: Request,
): Promise<Response> {
  const configs: AxiosRequestConfig<Request> = {
    url: `${BORED_API_BASE_URL}${resourcePath}`,
    method,
    data: method !== "GET" && method !== "get" ? body : undefined,
  };
  return (await axios(configs)).data;
}

/**
 * Error object thrown when error received when interacting with Bored API
 */
class BoredApiError {
  constructor(message: string) {
    this.message = message;
  }

  /**
   * Error message
   */
  message: string;
}

/**
 * Bored Adapter Error Handler
 *
 * @param e - The error property in the Bored API response
 * @throws A formatted error object
 */
export const errorHandler = (e: any): void => {
  const apiErrorMessage = e?.response?.data?.error;
  let message = `[BORED API ERROR] Error interacting with Bored API.`;
  if (apiErrorMessage) message += ` Error: ${apiErrorMessage}.`;

  Logger.error(message);

  throw new BoredApiError(message);
};

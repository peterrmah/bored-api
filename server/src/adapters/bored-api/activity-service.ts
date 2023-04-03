import { CatchError } from "../catch-decorator";
import { errorHandler, request } from "./helper";

/**
 * Bored API uri to activity resource
 */
const ACTIVITY_RESOURCE_PATH = "/activity";

/**
 * Response schema from Bored Activity API
 */
export interface ActivityResponse {
  /**
   * Description of the queried activity
   */
  activity: string;

  /**
   * A factor describing how possible an event is to do with zero being the most accessible
   * [0.0, 1.0]
   */
  accessibility: number;

  /**
   * Type of the activity
   * ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
   */
  type: string;

  /**
   * The number of people that this activity could involve
   * [0, n]
   */
  participants: number;

  /**
   * A factor describing the cost of the event with zero being free
   * [0, 1]
   */
  price: number;

  /**
   * A unique numeric id
   * [1000000, 9999999]
   */
  key: string;

  /**
   * Optional link to additional learning resources about the activity
   */
  link?: string;
}

/**
 * Adapter service to Bored API Activity service
 */
export class ActivityAdapterService {
  /**
   * Retrieves an Activity recommendation
   *
   * @returns Activity recommendation
   */
  @CatchError(errorHandler)
  static getRecommendation(): Promise<ActivityResponse> {
    return request("get", ACTIVITY_RESOURCE_PATH);
  }
}

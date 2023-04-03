import axios from "axios";
import { AccessibilityLevel, PriceLevel } from "../../database/models/user/types";
import { ACTIVITY_RESOURCE_PATH, BORED_API_BASE_URL } from "./routes";

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

export interface ActivityErrorResponse {
  /**
   * Error message from if error occurred
   */
  error: string;
}

/**
 * Adapter service to Bored API Activity service
 */
export class ActivityAdapterService {
  static baseResourcePath = `${BORED_API_BASE_URL}${ACTIVITY_RESOURCE_PATH}`;

  /**
   * Retrieves an Activity recommendation
   *
   * @param params Additional optional search parameters
   * @returns Activity recommendation
   */
  static async getRecommendation(params?: {
    priceRange: {
      min: number;
      max: number;
    };
    accessibilityRange: {
      min: number;
      max: number;
    };
  }): Promise<ActivityResponse | ActivityErrorResponse> {
    let searchParams: {
      minprice: number;
      maxprice: number;
      minaccessibility: number;
      maxaccessibility: number;
    };
    if (params) {
      searchParams = {
        minprice: params.priceRange.min,
        maxprice: params.priceRange.max,
        minaccessibility: params.accessibilityRange.min,
        maxaccessibility: params.accessibilityRange.max,
      };
    }

    const axiosResponse = await axios({
      url: ActivityAdapterService.baseResourcePath,
      method: "GET",
      params: searchParams,
    });
    // Bored API always returns 200 response with error prop in response body
    return axiosResponse.data as ActivityResponse | ActivityErrorResponse;
  }
}

interface ContinuousNumericalRange {
  /**
   * Discrete value representing the minimum point in the continuous range
   */
  min: number;

  /**
   * Discrete value representing the maximum point in the continuous range
   */
  max: number;
}

export interface LevellablePropertyManager<T> {
  /**
   * Calculates which level the provided discrete value falls in to
   *
   * @param value The discrete value to determine level for
   * @returns The level (bin) in which the value falls in to
   */
  valueToLevel(value: number): T;

  /**
   * Determines the continuous range in which the level represents
   *
   * @param level The level to get a range for
   * @returns Defined discrete values for the range in which this level represents
   */
  levelToRange(level: T): ContinuousNumericalRange;
}

export class PriceManager implements LevellablePropertyManager<PriceLevel> {
  valueToLevel(value: number): PriceLevel {
    let level: PriceLevel;
    switch (true) {
      case value === 0:
        level = PriceLevel.FREE;
        break;

      case value > 0 && value <= 0.5:
        level = PriceLevel.LOW;
        break;

      case value > 0.5:
        level = PriceLevel.HIGH;
        break;

      default:
        throw new Error("Invalid price value");
    }
    return level;
  }

  levelToRange(level: PriceLevel): ContinuousNumericalRange {
    let min: number, max: number;
    switch (level) {
      case PriceLevel.FREE:
        min = 0;
        max = 0;
        break;

      case PriceLevel.LOW:
        min = 0.1;
        max = 0.5;
        break;

      case PriceLevel.HIGH:
        min = 0.6;
        max = 1;
        break;

      default:
        throw new Error("Invalid price level");
    }
    return {
      min,
      max,
    };
  }
}

export class AccessibilityManager implements LevellablePropertyManager<AccessibilityLevel> {
  valueToLevel(value: number): AccessibilityLevel {
    let level: AccessibilityLevel;
    switch (true) {
      case value <= 0.25:
        level = AccessibilityLevel.HIGH;
        break;

      case value > 0.25 && value <= 0.75:
        level = AccessibilityLevel.MEDIUM;
        break;

      case value > 0.75:
        level = AccessibilityLevel.LOW;
        break;

      default:
        throw new Error("Invalid accessibility value");
    }
    return level;
  }

  levelToRange(level: AccessibilityLevel): ContinuousNumericalRange {
    let min: number, max: number;
    switch (level) {
      case AccessibilityLevel.HIGH:
        min = 0.0;
        max = 0.25;
        break;

      case AccessibilityLevel.MEDIUM:
        min = 0.26;
        max = 0.75;
        break;

      case AccessibilityLevel.LOW:
        min = 0.76;
        max = 1.0;
        break;

      default:
        throw new Error("Invalid accessibility level");
    }
    return {
      min,
      max,
    };
  }
}

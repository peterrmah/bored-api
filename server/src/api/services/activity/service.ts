import { ActivityAdapterService } from "../../../adapters/bored-api/activity-service";
import { type ActivityResponse } from "../../../adapters/bored-api/activity-service";

/**
 * Handles business logic regarding managing activities
 */
export class ActivityService {
  /**
   * Retrieves an activity suggestion
   *
   * @returns An activity suggestion
   */
  static async getSuggestion(): Promise<ActivityResponse> {
    return ActivityAdapterService.getRecommendation();
  }
}

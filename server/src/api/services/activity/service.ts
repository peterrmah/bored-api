import {
  AccessibilityManager,
  ActivityAdapterService,
  ActivityErrorResponse,
  PriceManager,
} from "../../../adapters/bored-api/activity-service";
import { type ActivityResponse } from "../../../adapters/bored-api/activity-service";
import { User } from "../../../database/models/user/entity";

/**
 * Handles business logic regarding managing activities
 */
export class ActivityService {
  /**
   * Retrieves an activity suggestion
   *
   * @note Takes in to account the MOST RECENTLY created user's preferences, if exists
   * @returns An activity suggestion
   */
  static async getSuggestion(): Promise<ActivityResponse | ActivityErrorResponse> {
    // Most recently created user
    const [user] = await User.find({
      order: {
        created_date: "DESC",
      },
      take: 1,
    });

    if (!user) return ActivityAdapterService.getRecommendation();

    const { price: priceLevel, accessibility: accessibilityLevel } = user;
    return ActivityAdapterService.getRecommendation({
      priceRange: new PriceManager().levelToRange(priceLevel),
      accessibilityRange: new AccessibilityManager().levelToRange(accessibilityLevel),
    });
  }
}

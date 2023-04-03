import { Get, JsonController } from "routing-controllers";

import { ActivityService } from "../../services/activity/service";
import { ActivityResourceDTO } from "./dtos";
import { ROUTES } from "../routes";
import {
  AccessibilityManager,
  ActivityErrorResponse,
  ActivityResponse,
  PriceManager,
} from "../../../adapters/bored-api/activity-service";

@JsonController(ROUTES.ACTIVITY)
export class ActivityController {
  /**
   * Returns an activity recommendation.
   * Takes in to account the LATEST created user's preference if exists.
   *
   * @returns An activity recommendation
   */
  @Get()
  async get(): Promise<ActivityResourceDTO | ActivityErrorResponse> {
    const untypedResponse = await ActivityService.getSuggestion();
    if ((untypedResponse as ActivityErrorResponse).error)
      return untypedResponse as ActivityErrorResponse;
    const response = untypedResponse as ActivityResponse;
    return new ActivityResourceDTO(
      response.activity,
      new AccessibilityManager(),
      response.accessibility,
      response.type,
      response.participants,
      new PriceManager(),
      response.price,
      response.key,
      response.link,
    );
  }
}

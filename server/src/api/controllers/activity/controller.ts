import { Get, JsonController } from "routing-controllers";

import { ActivityService } from "../../services/activity/service";
import { Accessibility, ActivityResourceDTO, Price } from "./dtos";
import { ROUTES } from "../routes";

@JsonController(ROUTES.ACTIVITY)
export class ActivityController {
  /**
   * Returns an activity recommendation.
   * Takes in to account the LATEST created user's preference if exists.
   *
   * @returns An activity recommendation
   */
  @Get()
  async get(): Promise<ActivityResourceDTO> {
    const response = await ActivityService.getSuggestion();
    return new ActivityResourceDTO(
      response.activity,
      new Accessibility(response.accessibility),
      response.type,
      response.participants,
      new Price(response.price),
      response.key,
      response.link,
    );
  }
}

import { Get, JsonController } from "routing-controllers";

import { Activity } from "../../models";
import { ROUTES } from "../routes";

@JsonController(ROUTES.ACTIVITY)
export class ActivityController {
  /**
   * Returns an activity recommendation.
   * Takes in to account the LATEST created user's preference if exists.
   */
  @Get()
  get(): Promise<Activity[]> {
    return Activity.find();
  }
}

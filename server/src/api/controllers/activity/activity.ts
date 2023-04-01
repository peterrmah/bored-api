import { Body, Get, JsonController, Post } from "routing-controllers";

import { Activity } from "../../models";

@JsonController("/example-entity")
export class UserController {
  @Get()
  get(): Promise<Activity[]> {
    return Activity.find();
  }

  @Post()
  create(@Body() body: Pick<Activity, "accessibility">): Promise<Activity> {
    return Activity.create(body).save();
  }
}

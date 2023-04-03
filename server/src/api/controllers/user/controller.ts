import { Body, JsonController, Post } from "routing-controllers";
import { EntityManager, Transaction, TransactionManager } from "typeorm";

import { UserService } from "../../services/user/service";
import { ROUTES } from "../routes";
import { UserResourceDTO } from "./dtos";
import { CreateUserBody } from "./types";

@JsonController(ROUTES.USER)
export class UserController {
  /**
   * Creates a User profile
   *
   * @returns The newly created User profile
   */
  @Post()
  @Transaction()
  async create(
    @TransactionManager() manager: EntityManager,
    @Body() body: CreateUserBody,
  ): Promise<UserResourceDTO> {
    const user = await new UserService(manager).create(body);
    return new UserResourceDTO(
      user.id,
      user.name,
      user.accessibility,
      user.price,
      user.created_date,
    );
  }
}

import { Manageable } from "../../../utils/manageable";
import { CreateUserBody } from "../../controllers/user/types";
import { User } from "../../../database/models/user/entity";

/**
 * Handles business logic regarding managing users
 */
export class UserService extends Manageable {
  /**
   * Creates a User profile
   *
   * @returns The newly created User
   */
  create(data: CreateUserBody): Promise<User> {
    return this.manager.save(
      User.create({
        name: data.name,
        accessibility: data.accessibility,
        price: data.price,
      }),
    );
  }
}

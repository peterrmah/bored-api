import { IsEnum, IsString } from "class-validator";

import { AccessibilityLevel, PriceLevel } from "../../../database/models/user/types";

export class CreateUserBody {
  /**
   * Name of user.
   *
   * @note 70 char max length
   */
  @IsString()
  name: string;

  /**
   * Preferred accessibility level
   */
  @IsEnum(AccessibilityLevel)
  accessibility: AccessibilityLevel;

  /**
   * Preferred price level
   */
  @IsEnum(PriceLevel)
  price: PriceLevel;
}

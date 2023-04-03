import { AccessibilityLevel, PriceLevel } from "../../../database/models/user/types";

export class UserResourceDTO {
  constructor(
    id: number,
    name: string,
    accessibility: AccessibilityLevel,
    price: PriceLevel,
    created_date: Date,
  ) {
    this.id = id;
    this.name = name;
    this.accessibility = accessibility;
    this.price = price;
    this.created_date = created_date.toISOString();
  }

  /**
   * Resource unique key
   */
  id: number;

  /**
   * Name of user
   *
   * @note 70 char max limit
   */
  name: string;

  /**
   * User's preferred activity price level
   */
  price: PriceLevel;

  /**
   * User's preferred activity accessibility level
   */
  accessibility: AccessibilityLevel;

  /**
   * Account creation date in ISO 8601 format
   */
  created_date: string;
}

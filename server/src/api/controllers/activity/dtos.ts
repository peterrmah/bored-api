import { LevellablePropertyManager } from "../../../adapters/bored-api/activity-service";
import { AccessibilityLevel, PriceLevel } from "../../../database/models/user/types";

export class ActivityResourceDTO {
  constructor(
    activity: string,
    accessibilityManager: LevellablePropertyManager<AccessibilityLevel>,
    accessibilityValue: number,
    type: string,
    participants: number,
    priceManager: LevellablePropertyManager<PriceLevel>,
    priceValue: number,
    key: string,
    link?: string,
  ) {
    this.activity = activity;
    this.accessibility = accessibilityManager.valueToLevel(accessibilityValue);
    this.type = type;
    this.participants = participants;
    this.price = priceManager.valueToLevel(priceValue);
    this.key = key;
    if (link) this.link = link;
  }

  activity: string;

  accessibility: AccessibilityLevel;

  type: string;

  participants: number;

  price: PriceLevel;

  key: string;

  link?: string;
}

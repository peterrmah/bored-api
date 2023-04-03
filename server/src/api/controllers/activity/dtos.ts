import { AccessibilityLevel, PriceLevel } from "../../../database/models/user/types";

export class ActivityResourceDTO {
  constructor(
    activity: string,
    accessibility: Accessibility,
    type: string,
    participants: number,
    price: Price,
    key: string,
    link?: string,
  ) {
    this.activity = activity;
    this.accessibility = accessibility.level;
    this.type = type;
    this.participants = participants;
    this.price = price.level;
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

abstract class Levellable<T> {
  constructor(value: number) {
    this.value = value;
    this.setLevel();
  }

  /**
   * Discrete value
   */
  value: number;

  /**
   * Mapped discrete value to a continuous level range
   */
  level: T;

  /**
   * Maps this discrete value into a continuous level name
   */
  abstract setLevel(): void;
}

export class Price extends Levellable<PriceLevel> {
  setLevel(): void {
    if (this.value === 0) {
      this.level = PriceLevel.FREE;
    } else if (this.value > 0 && this.value <= 0.5) {
      this.level = PriceLevel.LOW;
    } else if (this.value > 0.5) {
      this.level = PriceLevel.HIGH;
    } else {
      throw new Error("Invalid price value");
    }
  }
}

export class Accessibility extends Levellable<AccessibilityLevel> {
  setLevel(): void {
    if (this.value <= 0.25) {
      this.level = AccessibilityLevel.HIGH;
    } else if (this.value > 0.25 && this.value <= 0.75) {
      this.level = AccessibilityLevel.MEDIUM;
    } else if (this.value > 0.75) {
      this.level = AccessibilityLevel.LOW;
    } else {
      throw new Error("Invalid accessibility level");
    }
  }
}

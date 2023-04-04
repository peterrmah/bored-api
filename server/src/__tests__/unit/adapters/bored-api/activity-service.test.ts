import mockAxios from "jest-mock-axios";

import {
  AccessibilityManager,
  ActivityAdapterService,
  PriceManager,
} from "../../../../adapters/bored-api/activity-service";
import { AccessibilityLevel, PriceLevel } from "../../../../database/models/user/types";
import { mockAxiosGetActivitySuccessData, validSearchParams } from "./mock-data.json";

describe("ActivityAdapterService", () => {
  describe("Retrieve successful recommendation", () => {
    afterEach(() => {
      mockAxios.reset();
    });

    test("No provided search params makes http call without search params", async () => {
      mockAxios.get.mockResolvedValueOnce(mockAxiosGetActivitySuccessData);

      await ActivityAdapterService.getRecommendation();

      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(mockAxios.get).toHaveBeenCalledWith(ActivityAdapterService.baseResourcePath, {
        params: undefined,
      });
    });

    test("No provided search params makes http call with search params", async () => {
      mockAxios.get.mockResolvedValueOnce(mockAxiosGetActivitySuccessData);

      const params = validSearchParams;
      await ActivityAdapterService.getRecommendation(params);

      expect(mockAxios.get).toHaveBeenCalledTimes(1);
      expect(mockAxios.get).toHaveBeenCalledWith(ActivityAdapterService.baseResourcePath, {
        params: {
          minprice: params.priceRange.min,
          maxprice: params.priceRange.max,
          minaccessibility: params.accessibilityRange.min,
          maxaccessibility: params.accessibilityRange.max,
        },
      });
    });
  });
});

describe("PriceManager", () => {
  const priceManager = new PriceManager();

  describe("valueToLevel", () => {
    const INVALID_MAX_VALUE = 100;
    const INVALID_MIN_VALUE = -100;
    const HIGH_VALUE = 1;
    const LOW_VALUE = 0.5;
    const FREE = 0;

    test("Throw error when provided value exceeds range max", () => {
      expect(() => {
        priceManager.valueToLevel(INVALID_MAX_VALUE);
      }).toThrow();
    });

    test("Throw error when provided value is less than range min", () => {
      expect(() => {
        priceManager.valueToLevel(INVALID_MIN_VALUE);
      }).toThrow();
    });

    test("Correct value to level mappings", () => {
      expect(priceManager.valueToLevel(HIGH_VALUE)).toEqual(PriceLevel.HIGH);
      expect(priceManager.valueToLevel(LOW_VALUE)).toEqual(PriceLevel.LOW);
      expect(priceManager.valueToLevel(FREE)).toEqual(PriceLevel.FREE);
    });
  });

  describe("levelToRange", () => {
    test("Correct FREE price level to range mapping", () => {
      const DEFINED_RANGE = { min: 0, max: 0 };
      const actualRange = priceManager.levelToRange(PriceLevel.FREE);
      expect(actualRange.min).toEqual(DEFINED_RANGE.min);
      expect(actualRange.max).toEqual(DEFINED_RANGE.max);
    });

    test("Correct LOW price level to range mapping", () => {
      const DEFINED_RANGE = { min: 0.1, max: 0.5 };
      const actualRange = priceManager.levelToRange(PriceLevel.LOW);
      expect(actualRange.min).toEqual(DEFINED_RANGE.min);
      expect(actualRange.max).toEqual(DEFINED_RANGE.max);
    });

    test("Correct HIGH price level to range mapping", () => {
      const DEFINED_RANGE = { min: 0.6, max: 1 };
      const actualRange = priceManager.levelToRange(PriceLevel.HIGH);
      expect(actualRange.min).toEqual(DEFINED_RANGE.min);
      expect(actualRange.max).toEqual(DEFINED_RANGE.max);
    });
  });
});

describe("AccessibilityManager", () => {
  const accessibilityManager = new AccessibilityManager();

  describe("valueToLevel", () => {
    const INVALID_MAX_VALUE = 100;
    const INVALID_MIN_VALUE = -100;
    const HIGH_VALUE = 0.25;
    const MEDIUM_VALUE = 0.75;
    const LOW_VALUE = 1;

    test("Throw error when provided value exceeds range max", () => {
      expect(() => {
        accessibilityManager.valueToLevel(INVALID_MAX_VALUE);
      }).toThrow();
    });

    test("Throw error when provided value is less than range min", () => {
      expect(() => {
        accessibilityManager.valueToLevel(INVALID_MIN_VALUE);
      }).toThrow();
    });

    test("Correct value to level mappings", () => {
      expect(accessibilityManager.valueToLevel(HIGH_VALUE)).toEqual(AccessibilityLevel.HIGH);
      expect(accessibilityManager.valueToLevel(MEDIUM_VALUE)).toEqual(AccessibilityLevel.MEDIUM);
      expect(accessibilityManager.valueToLevel(LOW_VALUE)).toEqual(AccessibilityLevel.LOW);
    });
  });

  describe("levelToRange", () => {
    test("Correct LOW accessibility level to range mapping", () => {
      const DEFINED_RANGE = { min: 0.76, max: 1 };
      const actualRange = accessibilityManager.levelToRange(AccessibilityLevel.LOW);
      expect(actualRange.min).toEqual(DEFINED_RANGE.min);
      expect(actualRange.max).toEqual(DEFINED_RANGE.max);
    });

    test("Correct MEDIUM accessibility level to range mapping", () => {
      const DEFINED_RANGE = { min: 0.26, max: 0.75 };
      const actualRange = accessibilityManager.levelToRange(AccessibilityLevel.MEDIUM);
      expect(actualRange.min).toEqual(DEFINED_RANGE.min);
      expect(actualRange.max).toEqual(DEFINED_RANGE.max);
    });

    test("Correct HIGH accessibility level to range mapping", () => {
      const DEFINED_RANGE = { min: 0, max: 0.25 };
      const actualRange = accessibilityManager.levelToRange(AccessibilityLevel.HIGH);
      expect(actualRange.min).toEqual(DEFINED_RANGE.min);
      expect(actualRange.max).toEqual(DEFINED_RANGE.max);
    });
  });
});

const { defaults } = require("jest-config");

module.exports = {
  bail: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
  roots: ["src"],
  testMatch: ["<rootDir>/src/**/?(*.)(test|spec).{ts,tsx}"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  verbose: true,
};

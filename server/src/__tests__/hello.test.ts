describe("Test suite", () => {
  beforeAll(() => {
    console.log("Running before all tests are performed");
  });

  describe("Test set 1", () => {
    it("Set 1, test 1", () => {
      expect("Hello").toEqual("Hello");
    });

    it("Set 1, test 2", () => {
      expect("World").toEqual("World");
    });
  });

  describe("Test set 2", () => {
    it("Set 2, test 1", () => {
      expect("Hello").toEqual("Hello");
    });
  });
});

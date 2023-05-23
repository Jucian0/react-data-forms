import { useForm } from ".";

describe("useForm", () => {
  it("should be defined", () => {
    expect(useForm).toBeDefined();
  });

  it("should be a function", () => {
    expect(typeof useForm).toBe("function");
  });
});

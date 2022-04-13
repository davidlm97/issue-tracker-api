const { MongoClient } = require("mongodb");

beforeAll(async () => {
  console.log("before all");
});
afterAll(async () => {
  console.log("after all");
});

describe("Describe", () => {
  test("sumar 1 + 2 es igual a 3", () => {
    console.log("executing test");
    expect(1 + 2).toBe(3);
  });
});

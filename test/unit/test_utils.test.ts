import { processPagination } from "../../src/utils/index";

describe("Tests utils", () => {
  describe("processPagination", () => {
    test("Should return a 200", async () => {
      expect(processPagination(3, 2)).toStrictEqual({ page: 3, offset: 4, limit: 2 })
      expect(processPagination(NaN, 2)).toStrictEqual({ page: 1, offset: 0, limit: 2 })
      expect(processPagination(undefined, 2)).toStrictEqual({ page: 1, offset: 0, limit: 2 })
      expect(processPagination(3, NaN)).toStrictEqual({ page: 3, offset: 40, limit: 20 })
      expect(processPagination(3, undefined)).toStrictEqual({ page: 3, offset: 40, limit: 20 })
      expect(processPagination(NaN, NaN)).toStrictEqual({ page: 1, offset: 0, limit: 20 })
    });
  });
});

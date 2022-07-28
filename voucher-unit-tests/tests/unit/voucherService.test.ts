import voucherRepository from "../../src/repositories/voucherRepository";
import voucherService from "../../src/services/voucherService";
import { VoucherFactory } from "../factories/voucher.factory";

describe("voucherService test suite", () => {
  const voucherFactory = new VoucherFactory();

  describe("createVoucher", () => {
    it("should throw conflict error if code is not unique", () => {
      const mockVoucher = voucherFactory.newMockCreate();
      jest
        .spyOn(voucherRepository, "getVoucherByCode")
        .mockResolvedValueOnce(mockVoucher);

      try {
        voucherService.createVoucher(mockVoucher.code, mockVoucher.discount);
        fail();
      } catch (err) {
        expect(err.type).toBe("conflict");
      }
    });
  });
});

import voucherRepository from "../../src/repositories/voucherRepository";
import voucherService, {
  MIN_VALUE_FOR_DISCOUNT,
} from "../../src/services/voucherService";
import { VoucherFactory } from "../factories/voucher.factory";
import { fail } from "assert";

describe("voucherService test suite", () => {
  const voucherFactory = new VoucherFactory();

  describe("createVoucher", () => {
    it("should throw conflict error if code is not unique", async () => {
      const mockVoucher = voucherFactory.newMockCreate();
      jest
        .spyOn(voucherRepository, "getVoucherByCode")
        .mockResolvedValueOnce(mockVoucher);

      try {
        await voucherService.createVoucher(
          mockVoucher.code,
          mockVoucher.discount
        );
        fail();
      } catch (err) {
        expect(err.type).toBe("conflict");
      }
    });

    it("should go through in success", async () => {
      jest
        .spyOn(voucherRepository, "getVoucherByCode")
        .mockResolvedValueOnce(undefined);

      jest
        .spyOn(voucherRepository, "createVoucher")
        .mockResolvedValueOnce(undefined);

      const { code, discount } = voucherFactory.newMockCreate();
      await voucherService.createVoucher(code, discount);

      expect(voucherRepository.getVoucherByCode).toHaveBeenCalled();
      expect(voucherRepository.createVoucher).toHaveBeenCalled();
    });
  });

  describe("applyVoucher", () => {
    it("should throw not found error if code is not found", async () => {
      jest
        .spyOn(voucherRepository, "getVoucherByCode")
        .mockResolvedValueOnce(undefined);

      const { code, amount } = voucherFactory.newMockApply();
      try {
        await voucherService.applyVoucher(code, amount);
        fail();
      } catch (err) {
        expect(err.type).toBe("conflict");
      }
    });

    it("should not apply discount if voucher is used", async () => {
      const mockVoucher = voucherFactory.newMockCreate({ isUsed: true });
      jest
        .spyOn(voucherRepository, "getVoucherByCode")
        .mockResolvedValueOnce(mockVoucher);

      const { code, amount } = voucherFactory.newMockApply();
      const appliedVoucher = await voucherService.applyVoucher(code, amount);

      expect(appliedVoucher.amount).toEqual(amount);
      expect(appliedVoucher.finalAmount).toEqual(amount);
      expect(appliedVoucher.discount).toEqual(mockVoucher.discount);
      expect(appliedVoucher.applied).toBe(false);
    });

    it(`should not apply discount if amount is less than ${MIN_VALUE_FOR_DISCOUNT}`, async () => {
      const mockVoucher = voucherFactory.newMockCreate();
      jest
        .spyOn(voucherRepository, "getVoucherByCode")
        .mockResolvedValueOnce(mockVoucher);

      const { code, amount } = voucherFactory.newMockApply({
        amount: voucherFactory.randomInt(0, MIN_VALUE_FOR_DISCOUNT),
      });

      const appliedVoucher = await voucherService.applyVoucher(code, amount);

      expect(appliedVoucher.amount).toEqual(amount);
      expect(appliedVoucher.finalAmount).toEqual(amount);
      expect(appliedVoucher.discount).toEqual(mockVoucher.discount);
      expect(appliedVoucher.applied).toBe(false);
    });

    it("should correctly apply discount otherwise", async () => {
      const mockVoucher = voucherFactory.newMockCreate();
      jest
        .spyOn(voucherRepository, "getVoucherByCode")
        .mockResolvedValueOnce(mockVoucher);

      jest
        .spyOn(voucherRepository, "useVoucher")
        .mockImplementationOnce((): any => {});

      const { code, amount } = voucherFactory.newMockApply();

      const appliedVoucher = await voucherService.applyVoucher(code, amount);

      expect(appliedVoucher.amount).toEqual(amount);
      expect(appliedVoucher.finalAmount).toEqual(
        amount - amount * (mockVoucher.discount / 100)
      );
      expect(appliedVoucher.discount).toEqual(mockVoucher.discount);
      expect(appliedVoucher.applied).toBe(true);
    });
  });
});

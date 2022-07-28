import { faker } from "@faker-js/faker";
import { MIN_VALUE_FOR_DISCOUNT } from "../../src/services/voucherService";

export class VoucherFactory {
  constructor() {}

  newMockCreate({ isUsed = false } = {}) {
    let code = faker.random.alphaNumeric(10);
    let discount = this.randomInt(1, 100);

    return {
      id: this.randomInt(1, 30),
      used: isUsed,
      code,
      discount,
    };
  }

  newMockApply({ amount = this.randomInt(MIN_VALUE_FOR_DISCOUNT, 1000) } = {}) {
    let code = faker.random.alphaNumeric(10);

    return {
      code,
      amount,
    };
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

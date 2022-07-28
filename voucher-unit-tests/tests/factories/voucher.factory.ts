import { faker } from "@faker-js/faker";

export class VoucherFactory {
  constructor() {}

  newMockCreate() {
    let code = faker.random.alphaNumeric(10);
    let discount = this.randomInt(1, 100);

    return {
      id: this.randomInt(1, 30),
      used: false,
      code,
      discount,
    };
  }

  randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

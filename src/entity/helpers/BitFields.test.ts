import { Bits } from "./BitFields";

describe("BitFields a class to manage bitmask numbers", () => {
  it("Set new masked value into a number", () => {
    expect(Bits.set(1, 0, 0)).toBe(0);
    expect(Bits.set(0, 0, 1)).toBe(1);
    expect(Bits.set(0, 1, 1)).toBe(2);
    expect(Bits.set(3, 0, 0)).toBe(2);
    expect(Bits.set(1, 5, 1)).toBe(33);
    expect(Bits.set(19, 3, 1)).toBe(27);
  });
  it("Get masked value", () => {
    expect(Bits.get(1, 0)).toBe(1);
    expect(Bits.get(2, 0)).toBe(0);
    expect(Bits.get(2, 1)).toBe(1);
    expect(Bits.get(3, 0)).toBe(1);
    expect(Bits.get(19, 3)).toBe(0);
  });
});

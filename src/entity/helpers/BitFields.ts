export class Bits {
  static get(field: number, index: number) {
    return (field >> index) & 1;
  }

  static set(field: number, index: number, value: 1 | 0 = 1) {
    return (field & ~(1 << index)) | (value << index);
  }
}

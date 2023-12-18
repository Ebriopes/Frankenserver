export class Bits {
  static get(field: number, index: number): 0 | 1 {
    return ((field >> index) & 1) as 0 | 1;
  }

  static set(field: number, index: number, value: 1 | 0 = 1): number {
    return (field & ~(1 << index)) | (value << index);
  }
}

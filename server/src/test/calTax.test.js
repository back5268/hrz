const { calTax } = require('@service');

const taxSetup = {
  self: 11000000,
  dependent: 4400000,
  taxs: [
    {
      from: 1,
      to: 5,
      value: 5
    },
    {
      from: 5,
      to: 10,
      value: 10
    },
    {
      from: 10,
      to: 18,
      value: 15
    },
    {
      from: 18,
      to: 32,
      value: 20
    },
    {
      from: 32,
      to: 52,
      value: 25
    },
    {
      from: 52,
      to: 80,
      value: 30
    },
    {
      from: 80,
      to: 999,
      value: 35
    }
  ]
};

describe('CalSoonLate', () => {
  test('Tổng lương trước thuế nhỏ hơn giá trị giảm trừ bản thân', () => {
    const result = calTax(taxSetup, { pretaxIncome: 11000000, dependent: 2 });
    expect(result).toBe(0);
  });

  test('Tổng lương trước thuế bằng giá trị giảm trừ bản thân', () => {
    const result = calTax(taxSetup, { pretaxIncome: 11000000, dependent: 2 });
    expect(result).toBe(0);
  });

  test('Tổng lương trước thuế bằng giá trị giảm trừ bản thân và giảm trừ phụ thuộc', () => {
    const result = calTax(taxSetup, { pretaxIncome: 11000000 + 2 * 4400000, dependent: 2 });
    expect(result).toBe(0);
  });

  test('Hệ số thuế mức 1', () => {
    const result = calTax(taxSetup, { pretaxIncome: 11000000 + 2 * 4400000 + 4000000, dependent: 2 });
    expect(result).toBe(1400000);
  });

  test('Hệ số thuế mức 3', () => {
    const result = calTax(taxSetup, { pretaxIncome: 11000000 + 2 * 4400000 + 12000000, dependent: 2 });
    expect(result).toBe(4200000);
  });

  test('Hệ số thuế ngoài mức', () => {
    const result = calTax(taxSetup, { pretaxIncome: 11000000 + 2 * 4400000 + 10000000000, dependent: 2 });
    expect(result).toBe(3500000000);
  });
});

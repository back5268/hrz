const { calTax } = require('@service');

const taxSetup = {
  self: 11000000,
  dependent: 4400000,
  taxs: [
    {
      from: 0,
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
    const result = calTax(taxSetup, { pretaxIncome: 11000000, number: 0 });
    expect(result).toBe(0);
  });

  test('Thu nhập đóng thuế mức 1', () => {
    const result = calTax(taxSetup, { pretaxIncome: 13000000, number: 0 });
    expect(result).toBe(100000);
  });

  test('Thu nhập đóng thuế biên mức 2', () => {
    const result = calTax(taxSetup, { pretaxIncome: 16000000, number: 0 });
    expect(result).toBe(250000);
  });

  test('Thu nhập đóng thuế biên mức 3', () => {
    const result = calTax(taxSetup, { pretaxIncome: 21000000, number: 0 });
    expect(result).toBe(750000);
  });

  test('Thu nhập đóng thuế mức 4', () => {
    const result = calTax(taxSetup, { pretaxIncome: 31000000, number: 0 });
    expect(result).toBe(2350000);
  });

  test('Thu nhập đóng thuế mức 5', () => {
    const result = calTax(taxSetup, { pretaxIncome: 63000000, number: 0 });
    expect(result).toBe(9750000);
  });

  test('Thu nhập đóng thuế mức 6', () => {
    const result = calTax(taxSetup, { pretaxIncome: 95400000, number: 1 });
    expect(result).toBe(18150000);
  });

  test('Thu nhập đóng thuế mức 7', () => {
    const result = calTax(taxSetup, { pretaxIncome: 104200000, number: 2 });
    expect(result).toBe(19690000);
  });
});

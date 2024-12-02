const { calSoonlate } = require('@service');

const soonLateConfigs = [
  { from: 1, to: 10, value: 10000, type: 1 },
  { from: 11, to: 20, value: 20000, type: 1 },
  { from: 21, to: 60, value: 70000, type: 1 },
  { from: 61, to: 120, value: 150000, type: 1 },
  { from: 121, to: 240, value: 50, type: 2 },
  { from: 240, to: 999, value: 100, type: 2 }
];

describe('CalSoonLate', () => {
  test('Muộn 1p', () => {
    const result = calSoonlate([1], soonLateConfigs, 500000);
    expect(result).toBe(10000);
  });

  test('Muộn 10p', () => {
    const result = calSoonlate([10], soonLateConfigs, 500000);
    expect(result).toBe(10000);
  });

  test('Muộn 121p', () => {
    const result = calSoonlate([121], soonLateConfigs, 500000);
    expect(result).toBe(250000);
  });

  test('Muộn 241p', () => {
    const result = calSoonlate([241], soonLateConfigs, 500000);
    expect(result).toBe(500000);
  });

  test('Muộn nhiều ngày', () => {
    const result = calSoonlate([1, 20, 60, 241], soonLateConfigs, 500000);
    expect(result).toBe(600000);
  });

  // Test case mới
  test('Muộn 0p (Đúng giờ)', () => {
    const result = calSoonlate([0], soonLateConfigs, 500000);
    expect(result).toBe(0); // Không muộn, không phạt
  });

  test('Muộn 5p trong khoảng 1-10p', () => {
    const result = calSoonlate([5], soonLateConfigs, 500000);
    expect(result).toBe(10000); // Phạt 10,000 cho muộn 1-10 phút
  });

  test('Muộn 15p trong khoảng 11-20p', () => {
    const result = calSoonlate([15], soonLateConfigs, 500000);
    expect(result).toBe(20000); // Phạt 20,000 cho muộn 11-20 phút
  });

  test('Muộn 50p trong khoảng 21-60p', () => {
    const result = calSoonlate([50], soonLateConfigs, 500000);
    expect(result).toBe(70000); // Phạt 70,000 cho muộn 21-60 phút
  });

  test('Muộn 130p trong khoảng 61-120p', () => {
    const result = calSoonlate([130], soonLateConfigs, 500000);
    expect(result).toBe(250000); // Phạt 150,000 cho muộn 61-120 phút
  });

  test('Muộn 300p trong khoảng 240p và trên 240p', () => {
    const result = calSoonlate([300], soonLateConfigs, 500000);
    expect(result).toBe(500000); // Phạt tối đa 500,000 cho muộn trên 240 phút
  });

  test('Muộn 500p, phạt tối đa', () => {
    const result = calSoonlate([500], soonLateConfigs, 500000);
    expect(result).toBe(500000); // Phạt tối đa 500,000 cho muộn trên 240 phút
  });

  test('Muộn với danh sách lớn các thời gian', () => {
    const result = calSoonlate([5, 15, 50, 130, 300], soonLateConfigs, 500000);
    expect(result).toBe(850000); // Tổng phạt cho tất cả các thời gian này
  });
});

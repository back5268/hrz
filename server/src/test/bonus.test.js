const { createBonusService } = require('@service');

describe('Bonus Service', () => {
  describe('createBonusService', () => {
    test('Thêm khoản thưởng thành công', async () => {
      const result = await createBonusService({});
      expect(typeof result).toBe('object');
    });

    test('Khoản thưởng theo % lương cơ bản giá trị không thể lớn hơn 100!', async () => {
      await expect(
        createBonusService({
          body: {
            shift: '67335af9abaf908c6e963e19',
            type: 1,
            reason: 'Test',
            department: '6731bfbe64fba69397682ad3',
            account: '67348acac5d37f058aebd17f',
            dates: JSON.stringify(['2024-12-11'])
          },
          account: {
            _id: '673aa7f53754bf69d8f3ab97'
          }
        })
      ).rejects.toThrow('Khoản thưởng theo % lương cơ bản giá trị không thể lớn hơn 100!');
    });
  });
});

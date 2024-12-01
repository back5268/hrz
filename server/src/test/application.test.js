const { createApplicationAdminService } = require("@service");

describe('Application Service', () => {
  describe('createApplicationAdminService', () => {
    test('Tạo đơn thành công', async () => {
      const result = await createApplicationAdminService({
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
      });
      expect(typeof result).toBe('object');
    });

    test('Ca làm việc không tồn tại!', async () => {
      await expect(
        createApplicationAdminService({
          body: {
            shift: '67335af9abaf908c6e963e19z',
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
      ).rejects.toThrow('Ca làm việc không tồn tại!');
    });

    test('Không có lịch làm việc trong thời gian đã chọn!', async () => {
      await expect(
        createApplicationAdminService({
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
      ).rejects.toThrow('Không có lịch làm việc trong thời gian đã chọn!');
    });
  });
});

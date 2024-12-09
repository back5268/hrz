const { createApplicationAdminService } = require('@service');

describe('Application Service', () => {
  describe('createApplicationAdminService', () => {
    test('Tạo đơn thành công', async () => {
      const result = await createApplicationAdminService({
        body: {
          shift: '674c59660aadb53127af9529',
          type: 2,
          reason: 'ốm',
          department: '674c56605fc02e2f8b4a455f',
          account: '674c58ec0aadb53127af947f',
          dates: JSON.stringify(['2024-12-10'])
        },
        account: {
          _id: '674c565b5fc02e2f8b4a453a'
        }
      });
      expect(typeof result).toBe('object');
    });

    test('Ca làm việc không tồn tại!', async () => {
      await expect(
        createApplicationAdminService({
          body: {
            shift: '674c59660aadb53127af9522',
            type: 2,
            reason: 'ốm',
            department: '674c56605fc02e2f8b4a455f',
            account: '674c58ec0aadb53127af947f',
            dates: JSON.stringify(['2024-12-10'])
          },
          account: {
            _id: '674c565b5fc02e2f8b4a453a'
          }
        })
      ).rejects.toThrow('Ca làm việc không tồn tại!');
    });

    test('Không có lịch làm việc trong thời gian đã chọn!', async () => {
      await expect(
        createApplicationAdminService({
          body: {
            shift: '674c59660aadb53127af9529',
            type: 2,
            reason: 'ốm',
            department: '674c56605fc02e2f8b4a455f',
            account: '674c58ec0aadb53127af947f',
            dates: JSON.stringify(['2024-12-15'])
          },
          account: {
            _id: '674c565b5fc02e2f8b4a453a'
          }
        })
      ).rejects.toThrow('Không có lịch làm việc trong thời gian đã chọn!');
    });

    test('Nhân sự này đã dùng hết số ngày nghỉ phép năm!', async () => {
      await expect(
        createApplicationAdminService({
          body: {
            shift: '674c59660aadb53127af9529',
            type: 1,
            reason: 'ốm',
            department: '674c56605fc02e2f8b4a455f',
            account: '674c58ec0aadb53127af947f',
            dates: JSON.stringify(['2024-12-10'])
          },
          account: {
            _id: '674c565b5fc02e2f8b4a453a'
          }
        })
      ).rejects.toThrow('Nhân sự này đã dùng hết số ngày nghỉ phép năm!');
    });

    test('Không tìm thấy nhân viên!', async () => {
      await expect(
        createApplicationAdminService({
          body: {
            shift: '674c59660aadb53127af9529',
            type: 1,
            reason: 'ốm',
            department: '674c56605fc02e2f8b4a455f',
            account: '674c565b5fc02e2f8b4a453b',
            dates: JSON.stringify(['2024-12-10'])
          },
          account: {
            _id: '674c565b5fc02e2f8b4a453a'
          }
        })
      ).rejects.toThrow('Không tìm thấy nhân viên!');
    });
  });
});

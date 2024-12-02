const { signInService, sendOtpForgotPasswordService } = require('@service');

describe('Auth Service', () => {
  describe('signInService', () => {
    test('Đăng nhập thành công!', async () => {
      const result = await signInService({ body: { username: 'admin5268@gmail.com', password: 'admin5268' } });
      expect(typeof result).toBe('string');
      expect(result).not.toBe('');
    });

    test('!"username" is required', async () => {
      await expect(signInService({ body: {} })).rejects.toThrow('"username" is required');
    });

    test('Người dùng không tồn tại!', async () => {
      await expect(signInService({ body: { username: 'hundredzz@gmail.com', password: 'admin5268' } })).rejects.toThrow(
        'Người dùng không tồn tại!'
      );
    });

    test('!sss', async () => {
      await expect(signInService({ body: { username: 'admin5268@gmail.com', password: 'adminss' } })).rejects.toThrow(
        'Mật khẩu không chính xác!'
      );
    });
  });

  describe('Quên mật khẩu thành công!', () => {
    test('should send password reset email for a valid email', async () => {
      const result = await sendOtpForgotPasswordService({ body: { username: 'admin5268@gmail.com' } });
      expect(result).toEqual('admin5268@gmail.com');
    });

    test('Không tìm thấy người dùng!', async () => {
      await expect(sendOtpForgotPasswordService({ body: { username: 'hundredzz@gmail.com' } })).rejects.toThrow(
        'Không tìm thấy người dùng!'
      );
    });
  });
});

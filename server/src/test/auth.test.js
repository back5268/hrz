const { signInService, sendOtpForgotPasswordService } = require('@service');

describe('Auth Service', () => {
  describe('signInService', () => {
    test('Đăng nhập thành công!', async () => {
      const result = await signInService({ username: 'hundredz@gmail.com', password: 'admin5268' });
      expect(typeof result).toBe('string');
      expect(result).not.toBe('');
    });

    test('Mật khẩu không chính xác!', async () => {
      await expect(signInService({ username: 'hundredz@gmail.com', password: 'admin5268z' })).rejects.toThrow('Mật khẩu không chính xác!');
    });

    test('Người dùng không tồn tại!', async () => {
      await expect(signInService({ username: 'hundredzz@gmail.com', password: 'admin5268' })).rejects.toThrow('Người dùng không tồn tại!');
    });
  });

  describe('Quên mật khẩu thành công!', () => {
    test('should send password reset email for a valid email', async () => {
      const result = await sendOtpForgotPasswordService({ username: 'hundredz@gmail.com' });
      expect(result).toEqual('hundredz@gmail.com');
    });

    test('Không tìm thấy người dùng!', async () => {
      await expect(sendOtpForgotPasswordService({ username: 'hundredzz@gmail.com' })).rejects.toThrow('Không tìm thấy người dùng!');
    });
  });
});

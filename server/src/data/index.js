export const users = [
  {
    staffCode: "ADMIN",
    fullName: "Hundredz",
    email: "hundredz2409@gmail.com",
    phone: "0976630981",
    password: "$2a$10$vUQ3qDh1nEWkmOTxNyIlD.2ZbusTu7FwY.GicvvIUI0O92Jgoqb4G",
    gender: 1,
    birthday: new Date("2002-09-15"),
    role: "admin",
    bankAccount: "606606868",
  }
];

export const templates = [
  {
    type: 1,
    code: 'FORGOT_PASSWORD',
    subject: '[HRZ] - Quên mật khẩu!',
    content: `<p>Bạn hoặc ai đó đã sử dụng email lấy lại mật khẩu tài khoản: <b>$username</b>!</p>
            <p>Mã xác nhận của bạn là: <b>$otp</b> </p> <br />
            <p>Lưu ý: Mã xác nhận chỉ được sử dụng 1 lần và có <b>thời hạn trong 5 phút.</b></p>
            <p>Vui lòng không cung cấp mã xác nhận trên cho bất kỳ ai.</p>
            <p>Trân trọng cảm ơn,</p> <br />
            <p>------------------------------------------------------------</p>
            <p>PHẦN MỀM QUẢN LÝ NHÂN SỰ HRZ</p>
            <p>Trân trọng thông báo!</p>
            `
  }
];


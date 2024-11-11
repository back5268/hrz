import { detailAccountMd, detailSalaryMd, detailTemplateMd } from '@models';
import { formatNumber, ghepGiaTri, replaceFistText } from '@utils';
import { JSDOM } from 'jsdom';

export const previewSalaryRp = async (_id) => {
  const data = await detailSalaryMd({ _id });
  if (!data) return { status: 0, mess: 'Phiếu lương không tồn tại!' };
  const template = await detailTemplateMd({ type: 5 });
  if (!template || !template.content) return { status: 0, mess: 'Không có mẫu phiếu lương!' };
  const account = await detailAccountMd({ _id: data.account });
  if (!account) return { status: 0, mess: 'Không tìm thấy nhân viên!' };
  const content = `<main style="max-width: 1000px; margin: 0 auto; font-family: 'Times New Roman', Times, serif; font-size: 14px;">
    <p style="margin: 4px; line-height: 24px; color: red; font-weight: 600;">(Yêu cầu CBNV cam kết không tiết lộ
        hoặc thăm hỏi tiền lương của bất kỳ đồng nghiệp nào)</p>
    <p style="margin: 4px; line-height: 24px">Họ và tên: $ho_va_ten</p>
    <p style="margin: 4px; line-height: 24px">Mã nhân viên: $ma_nhan_vien</p>
    <table style="border-collapse: collapse; width: 100%; margin: 20px 0; font-size: 14px;">
        <thead>
            <tr>
                <th
                    style="border: 1px solid black; padding: 8px; text-align: center; text-transform: uppercase; background-color: #bdd6ee;">
                    STT</th>
                <th
                    style="border: 1px solid black; padding: 8px; text-align: center; text-transform: uppercase; background-color: #bdd6ee">
                    Nội dung</th>
                <th
                    style="border: 1px solid black; padding: 8px; text-align: center; text-transform: uppercase; background-color: #bdd6ee">
                    Đơn vị tính</th>
                <th
                    style="border: 1px solid black; padding: 8px; text-align: center; text-transform: uppercase; background-color: #bdd6ee">
                    Chi tiết</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">1</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: left;">Tổng thu nhập trong tháng
                    (A + B)</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: right;">$tong_thu_nhap_trong_thang</th>
            </tr>
            <tr>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">A</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: left;">Tổng lương theo ngày công
                </th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: right;">$tong_luong_theo_ngay_cong</th>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">A.1</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Lương BHXH</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$luong_bhxh</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">A.2</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Lương theo hợp đồng lao
                    động</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;"></td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">- Lương thử việc</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$luong_thu_viec</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;"></td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">- Lương chính thức</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$luong_chinh_thuc</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">A.3</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Ngày nghỉ không lương</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Ngày</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$ngay_nghi_khong_luong
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;"></td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Ngày nghỉ hưởng BHXH</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Ngày</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$ngay_nghi_bhxh
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">A.4</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Ngày được tính lương (A.4.1
                    + A.4.2 + A.4.3 + A.4.4 + A.4.5 - A.4.6), Trong đó</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Ngày</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;"></td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">- Công thử việc / học việc
                </td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Ngày</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$cong_thu_viec
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;"></td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">- Công Chính thức
                </td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Ngày</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$cong_chinh_thuc
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;"></td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">- Công thêm giờ
                </td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Ngày</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$cong_them_gio
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">A.4.1</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Ngày đi làm chấm công
                </td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Ngày</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$ngay_di_lam_cham_cong
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">A.4.2</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Ngày nghỉ phép năm
                </td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Ngày</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$ngay_nghi_phep_nam
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">A.4.3</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Ngày nghỉ lễ / tết
                </td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Ngày</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$ngay_nghi_le_tet
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">A.4.4</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Ngày nghỉ chế độ</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Ngày</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$ngay_nghi_che_do
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">A.4.5</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Nghỉ bù</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Ngày</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$nghi_bu
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">A.4.6</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Trừ đi trễ về sớm</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Ngày</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$so_ngay_di_tre
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;"></td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Tiền phạt đi trễ về sớm
                </td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$tien_phat_di_tre
                </td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">B</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: left;">Tổng phụ cấp, thu nhập phát
                    sinh (B.1 + B.2 + ... + B.14)
                </th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: right;">$tong_phu_cap</th>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">$stt</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">$ten_phu_cap
                </td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$so_tien_phu_cap
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">B.13</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Điều chỉnh tăng giảm lương
                    các tháng trước (+/-)
                </td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$dieu_chinh_luong
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">B.14</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Khác
                </td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$khac
                </td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">2</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: left;">Tổng các khoản trừ (2.1 +
                    2.2 + ...)</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: right;"></th>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">2.1</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">BHXH $gia_tri_bhxh%
                </td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$tien_bhxh
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">2.2</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">BHYT $gia_tri_bhyt%
                </td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$tien_bhyt
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">2.3</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">BHTN $gia_tri_bhtn%
                </td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$tien_bhtn
                </td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">2.4</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Phí công đoàn
                    $gia_tri_phi_cong_doan%
                </td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$tien_phi_cong_doan
                </td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">3</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: left;">Truy thu/truy trả trước
                    thuế</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: right;"></th>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;"></td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Lý do truy thu/truy trả
                    (nếu có)</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;"></td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;"></td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">4</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: left;">Thuế thu nhập cá nhân</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: right;">$thue_thu_nhap</th>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">4.1</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Thu nhập chịu thuế</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$thu_nhap_chiu_thue</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">4.2</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Giảm trừ bản thân</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$giam_tru_ban_than</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">4.3</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Giảm trừ gia cảnh</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$giam_tru_gia_canh</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;"></td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Số người phụ thuộc</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Người</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$so_nguoi_phu_thuoc</td>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">4.4</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Thu nhập tính thuế</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;">$thu_nhap_tinh_thue</td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">5</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: left;">Trừ khác sau thuế</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: right;"></th>
            </tr>
            <tr>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;"></td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: left;">Lý do truy thu/truy trả sau
                    thuế</td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: center;"></td>
                <td style="border: 1px solid black; padding: 4px 8px; text-align: right;"></td>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">6</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: left;">Tiền lương thực nhận (1 - 2
                    - 3 - 4 - 5)</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">Đồng</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: right;">$tien_luong_thuc_nhan</th>
            </tr>
        </tbody>
        <tbody>
            <tr>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">7</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: left;">Lý do chưa đủ điều kiện
                    thanh toán lương trong kỳ</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: center;">Thiếu</th>
                <th style="border: 1px solid black; padding: 4px 8px; text-align: right;"></th>
            </tr>
        </tbody>
    </table>

    <p style="margin: 4px; line-height: 24px">Công ty ghi nhận và cảm ơn sự đóng góp của bạn đối với sự phát triển
        của Cty.</p>
    <p style="margin: 4px; line-height: 24px">Lưu ý: CB, NV lưu giữ lại phiếu lương để làm chứng từ đối chứng khi
        quyết toán thuế cuối năm.</p>
    <p style="margin: 4px; line-height: 24px">Mọi thắc mắc về:</p>
    <p style="margin: 4px; line-height: 24px"><b>1. Những TH anh/chị chưa nhận thanh toán lương, Anh/chị vui lòng
            check lý do ở mục (7) và sớm hoàn tất thủ
            tục liên quan, cụ thể:</b></p>
    <p style="margin: 4px; line-height: 24px"><i>* Những trường hợp anh/ chị đang, đã xin nghỉ việc thì anh chị cần
            làm thủ tục bàn giao gồm:</i></p>
    <p style="margin: 4px; line-height: 24px">- Đơn xin nghỉ việc (có xác nhận của quản lý - TP, GĐ)</p>
    <p style="margin: 4px; line-height: 24px">- Các CCDC, tài sản cần bàn giao: Máy tính, điện thoại, thẻ nhân viên,
        caravat, đồng phục, thẻ xe, BHYT và
        các TS-CCDC đã được cấp phát khác ( Nếu có), được ký bàn giao lại trên biên bản bàn giao với các bộ phận
        liên quan ký xác nhận.</p>
    <p style="margin: 4px; line-height: 24px">- Thanh toán các khoản nợ (Nếu có):</p>
    <p style="margin: 4px; line-height: 24px"><i>* Trường hợp chưa có số tài khoản, có số nhưng chưa hoàn tất thủ
            tục hồ sơ, nhân sự đang có vướng mắc công
            nợ với công ty</i></p>
    <p style="margin: 4px; line-height: 24px">TH chưa có số tài khoản VP BANK: Anh/chị vui lòng hoàn tất thủ tục làm
        thẻ và báo số tới phòng HCNS khi hoàn
        tất</p>
    <p style="margin: 4px; line-height: 24px">Lưu ý: Gửi số tài khoản ghi rõ: Số tài khoản + Chi nhánh ngân hàng mở
        thẻ + Tỉnh mở thẻ</p>
    <p style="margin: 4px; line-height: 24px"><i>* Trường hợp chưa hoàn tất thủ tục hồ sơ, nhân sự đang có vướng mắc
            công nợ với công ty:</i></p>
    <p style="margin: 4px; line-height: 24px"><b>2. Tiền ăn, tiền xe: </b>Được tính theo ngày công thực tế</p>
    <p style="margin: 4px; line-height: 24px"><b>3. Ngày công tính lương: </b>Là số ngày các bạn làm việc thực tế
        trong tháng (có trừ đi muộn về sớm - Nếu
        có)</p>
    <p style="margin: 4px; line-height: 24px"><b>4. Trừ Thuế TNCN:</b></p>
    <p style="margin: 4px; line-height: 24px">Theo quy định của BTC trong thông tư TT111/BTC-CP về việc trích thuế
        TNCN với các TH đang ký hợp đồng ngắn
        hạn. Trong thời gian NLĐ ký HĐ ngắn hạn ( Học việc, thử việc) có mức thu nhập từ 2 triệu trở lên sẽ bị trích
        thuế 10%. Số tiền này sẽ được hoàn trả lại khi quyết toán thuế của năm ( Thường là tháng 3 năm tiếp sau đó )
        nếu trung bình cộng thu nhập của bạn trong năm không vượt mức nộp thuế</p>
    <p style="margin: 4px; line-height: 24px">Khi nào NLĐ ký hợp đồng lao động làm NV chính thức sẽ đc tính mức giảm
        trừ là 11 triệu.</p>
    <p style="margin: 4px; line-height: 24px">*****</p>
    <p style="margin: 4px; line-height: 24px">Lưu ý thắc mắc về lương, anh/chị chỉ gửi mail tới người phụ trách, vì
        lương là bảo mật, anh/chị không để lộ
        thông tin lương. Nếu có trường hợp tiết lộ thông tin lương thì sẽ bị xử phạt theo quy chế. Nặng là bị sa
        thải. Đối với những TH phòng HCNS đã gửi bảng công, vi phạm mà anh/chị ko check phòng HCNS sẽ không giải
        quyết thắc mắc. Phòng HCNS chỉ giải quyết các TH có thắc mắc mà phòng HCNS thiếu sót chưa xử lý.</p>
            </main>`;
  const subject = template.subject;

  let allowanceAmount = 0;
  const templateHtml = new JSDOM(content, { contentType: 'text/html' });
  const table = templateHtml.window.document.querySelector('table');
  const tbodys = table.querySelectorAll('tbody');
  const tbody2 = tbodys[1];
  let newBody2 = '';
  const allowances = data.allowances;
  newBody2 += tbody2.querySelectorAll('tr')[0].outerHTML;
  allowances?.forEach((allowance, index) => {
    const content = tbody2.querySelectorAll('tr')[1].outerHTML;
    allowanceAmount += allowance.summary;
    newBody2 += replaceFistText(
      ghepGiaTri({
        params: {
          $stt: `B.${index + 1}`,
          $ten_phu_cap: allowance.name + (!allowance.type ? '' : ` (${allowance.type === 1 ? 'Theo tháng' : 'Theo ngày công thực tế'})`),
          $so_tien_phu_cap: allowance.summary
        },
        content
      })
    );
  });
  newBody2 += tbody2.querySelectorAll('tr')[2].outerHTML;
  newBody2 += tbody2.querySelectorAll('tr')[3].outerHTML;
  tbody2.innerHTML = newBody2;
  const html = templateHtml.window.document.querySelector('main').outerHTML;
  const day = data.day || {};
  const mandatory = data.mandatory || {};
  const tax = data.tax || {};
  const accountInfo = data.accountInfo;
  const numberWork = day.nomal;
  const params = {
    $ho_va_ten: account.fullName,
    $ma_nhan_vien: account.staffCode,
    $tong_thu_nhap_trong_thang: allowanceAmount + data.officialSalary,
    $tong_luong_theo_ngay_cong: data.officialSalary,
    $luong_bhxh: accountInfo.salary,
    $luong_thu_viec: accountInfo.type === 2 ? accountInfo.salary : '',
    $luong_chinh_thuc: data.officialSalary,
    $ngay_nghi_khong_luong: day.noSalary || '',
    $ngay_nghi_bhxh: '',
    $cong_thu_viec: accountInfo.type === 2 ? numberWork : '',
    $cong_chinh_thuc: accountInfo.type === 1 ? numberWork : '',
    $cong_them_gio: day.ot || '',
    $ngay_di_lam_cham_cong: (day.day + day.holiday + day.annualLeave + day.regime) || '',
    $ngay_nghi_phep_nam: day.annualLeave || '',
    $ngay_nghi_le_tet: day.holiday || '',
    $ngay_nghi_che_do: day.regime || '',
    $nghi_bu: day.compensatoryLeave || '',
    $so_ngay_di_tre: data.soonLates?.length || '',
    $tien_phat_di_tre: data.soonLates?.reduce((a, b) => a + b.summary, 0),
    $tong_phu_cap: allowanceAmount,
    $gia_tri_bhyt: mandatory?.bhyt?.value,
    $tien_bhyt: mandatory?.bhyt?.summary,
    $gia_tri_bhxh: mandatory?.bhxh?.value,
    $tien_bhxh: mandatory?.bhxh?.summary,
    $gia_tri_bhtn: mandatory?.bhtn?.value,
    $tien_bhtn: mandatory?.bhtn?.summary,
    $gia_tri_phi_cong_doan: mandatory?.unionDues?.value,
    $tien_phi_cong_doan: mandatory?.unionDues?.summary,
    $thue_thu_nhap: account.type === 1 ? data.baseSalary : 0,
    $thu_nhap_chiu_thue: data.pretaxIncome,
    $giam_tru_ban_than: tax.self,
    $giam_tru_gia_canh: tax.dependent?.value * tax.dependent?.quantity,
    $so_nguoi_phu_thuoc: tax.dependent?.quantity,
    $thu_nhap_tinh_thue: account.type === 1 ? data.baseSalary : 0,
    $tien_luong_thuc_nhan: data.summary
  };
  return {
    status: 1,
    data: {
      html: replaceFistText(ghepGiaTri({ params, content: html })),
      subject: replaceFistText(ghepGiaTri({ params: { $ky_thang: data.month }, content: subject })),
      account
    }
  };
};

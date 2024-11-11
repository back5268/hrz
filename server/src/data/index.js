export const accounts = [
  {
    staffCode: 'ADMIN',
    fullName: 'ADMIN',
    email: 'admin5268@gmail.com',
    phone: '0999999999',
    password: '$2a$12$kpWFGCflNJs37Jn1u0uUUuYaFRCt8dAhwYyLhiUm0.GuYCNBq6CuO',
    birthday: '2002-09-15',
    cmt: '0999999999',
    dateOfIssue: '2020-09-15',
    placeOfIssue: 'Hà Nội',
    address: 'Phúc Thọ, Hà Nội',
    gender: 1,
    role: 'admin',
    dateIn: '2024-10-10',
    bankAccount: '606606868',
    salary: 999999999,
    type: 1
  }
];

export const jobPositions = [
  {
    updatedBy: 0,
    name: 'Lập trình viên (Software Developer)',
    code: 'DEV',
    description:
      'Phát triển, thử nghiệm và duy trì các phần mềm, ứng dụng. Lập trình viên cần hiểu sâu về ngôn ngữ lập trình (như JavaScript, Python, C++, v.v.) và phối hợp với các bộ phận khác để phát triển sản phẩm.'
  },
  {
    updatedBy: 0,
    name: 'Chuyên viên phân tích hệ thống (System Analyst)',
    code: 'SA',
    description:
      'Phân tích yêu cầu của hệ thống công nghệ thông tin, đưa ra các giải pháp công nghệ để giải quyết vấn đề kinh doanh. Họ làm việc với các lập trình viên và quản lý dự án để đảm bảo hệ thống hoạt động trơn tru.'
  },
  {
    updatedBy: 0,
    name: 'Quản lý dự án (Project Manager)',
    code: 'PM',
    description:
      'Quản lý, theo dõi và giám sát tiến độ của các dự án công nghệ. Họ phải phối hợp giữa các bộ phận khác nhau, đảm bảo dự án hoàn thành đúng hạn và trong ngân sách.'
  },
  {
    updatedBy: 0,
    name: 'Thiết kế UI/UX (UI/UX Designer)',
    code: 'DESIGN',
    description:
      'Thiết kế giao diện và trải nghiệm người dùng cho các sản phẩm phần mềm và ứng dụng. Họ tập trung vào việc tạo ra các giao diện dễ sử dụng, trực quan, và mang lại trải nghiệm tốt nhất cho người dùng.'
  },
  {
    updatedBy: 0,
    name: 'Chuyên viên kiểm thử phần mềm (QA/QC Tester)',
    code: 'TEST',
    description:
      'Đảm bảo chất lượng của phần mềm thông qua việc kiểm tra, phát hiện lỗi (bug) và đề xuất các biện pháp khắc phục trước khi sản phẩm được phát hành.'
  }
];

export const positions = [
  {
    updatedBy: 0,
    name: 'Giám đốc (Director)',
    code: 'BOSS',
    allowances: [
      { name: 'Trách nhiệm', amount: 5000000, type: 1 },
      { name: 'Ăn trưa', amount: 1000000, type: 2 },
      { name: 'Xăng xe', amount: 5000000, type: 1 },
      { name: 'Điện thoại', amount: 4000000, type: 1 },
      { name: 'Gửi xe', amount: 600000, type: 2 }
    ],
    description: 'Người đứng đầu công ty, chịu trách nhiệm quản lý toàn bộ hoạt động của công ty.'
  },
  {
    updatedBy: 0,
    name: 'Trưởng phòng (Head of Department)',
    code: 'HEAD',
    allowances: [
      { name: 'Trách nhiệm', amount: 3500000, type: 1 },
      { name: 'Ăn trưa', amount: 680000, type: 2 },
      { name: 'Xăng xe', amount: 2000000, type: 1 },
      { name: 'Điện thoại', amount: 2500000, type: 1 },
      { name: 'Gửi xe', amount: 250000, type: 2 }
    ],
    description: 'Người đứng đầu một phòng ban cụ thể trong công ty, chịu trách nhiệm quản lý và giám sát hoạt động của phòng ban đó.'
  },
  {
    updatedBy: 0,
    name: 'Nhân viên (Employee)',
    code: 'EMPLOYEE',
    allowances: [
      { name: 'Ăn trưa', amount: 550000, type: 2 },
      { name: 'Xăng xe', amount: 1500000, type: 1 },
      { name: 'Điện thoại', amount: 2000000, type: 1 },
      { name: 'Gửi xe', amount: 150000, type: 2 }
    ],
    description:
      'Người thực hiện các công việc cụ thể trong từng phòng ban, đảm bảo hoàn thành nhiệm vụ được giao theo kế hoạch và mục tiêu chung của công ty.'
  }
];

export const departments = [
  {
    updatedBy: 0,
    name: 'Phòng Phát Triển Sản Phẩm',
    code: 'PTSP',
    description: 'Phát triển, kiểm thử và thiết kế sản phẩm; quản lý các dự án phát triển.'
  },
  {
    updatedBy: 0,
    name: 'Phòng Hỗ Trợ Khách Hàng và Kỹ Thuật',
    code: 'HTKT',
    description: 'Cung cấp hỗ trợ kỹ thuật cho khách hàng; giải quyết vấn đề kỹ thuật.'
  },
  {
    updatedBy: 0,
    name: 'Phòng Marketing và Bán Hàng',
    code: 'MAKET',
    description: 'Lập kế hoạch và triển khai các chiến dịch marketing; đạt mục tiêu doanh thu và quản lý mối quan hệ với khách hàng.'
  },
  {
    updatedBy: 0,
    name: 'Phòng Hành Chinh Nhân Sự',
    code: 'HCNS',
    description: 'Quản lý tuyển dụng, đào tạo, phúc lợi và các vấn đề tài chính, kế toán.'
  }
];

export const templates = [
  {
    type: 1,
    subject: '[HRZ] - Hợp đồng lao động!',
    description: 'Hợp đồng lao động'
  },
  {
    type: 2,
    subject: '[HRZ] - Hợp đồng dịch vụ!',
    description: 'Hợp đồng dịch vụ'
  },
  {
    type: 3,
    subject: '[HRZ] - Hợp đồng thử việc!',
    description: 'Hợp đồng thử việc'
  },
  {
    type: 4,
    subject: '[HRZ] - Hợp đồng theo dự án!',
    description: 'Hợp đồng theo dự án'
  },
  {
    type: 5,
    subject: '[HRZ] - Phiếu lương tháng $ky_thang!',
    content: `<main style="max-width: 1000px; margin: 0 auto; font-family: 'Times New Roman', Times, serif; font-size: 14px;">
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
            </main>`,
    description: 'Phiếu lương'
  },
  {
    type: 6,
    subject: '[HRZ] - Quên mật khẩu!',
    content: `<p>Bạn hoặc ai đó đã sử dụng email lấy lại mật khẩu tài khoản: <b>$username</b>!</p>
            <p>Mã xác nhận của bạn là: <b>$otp</b> </p> <br />
            <p>Lưu ý: Mã xác nhận chỉ được sử dụng 1 lần và có <b>thời hạn trong 5 phút.</b></p>
            <p>Vui lòng không cung cấp mã xác nhận trên cho bất kỳ ai.</p>
            <p>Trân trọng cảm ơn,</p> <br />
            <p>------------------------------------------------------------</p>
            <p>PHẦN MỀM QUẢN LÝ NHÂN SỰ HRZ</p>
            <p>Trân trọng thông báo!</p>`,
    description: 'Quên mật khẩu'
  },
  {
    type: 7,
    subject: '[HRZ] - Cảnh báo chấm công!',
    content: `<p>Hôm nay bạn chưa chấm công vui lòng kiểm tra lại.</p>
            <p>Trân trọng cảm ơn,</p> <br />
            <p>------------------------------------------------------------</p>
            <p>PHẦN MỀM QUẢN LÝ NHÂN SỰ HRZ</p>
            <p>Trân trọng thông báo!</p>`,
    description: 'Cảnh báo chấm công'
  }
];

export const configs = [
  { type: 1, timekeeping: {} },
  {
    type: 2,
    salary: {
      salaryCoefficient: 26,
      mandatory: {
        bhxh: 8,
        bhyt: 1.5,
        bhtn: 1,
        unionDues: 0
      }
    },
    ot: {
      day: 125,
      sunday: 150,
      holiday: 200
    },
    soonLate: [
      { from: 1, to: 10, value: 10000, type: 1 },
      { from: 10, to: 20, value: 20000, type: 1 }
    ],
    holidays: []
  },
  { type: 3, tax: { self: 11000000, dependent: 4400000 } }
];

export const tools = [
  { name: 'Trang chủ', icon: 'Squares2X2Icon', sort: 1, items: [{ name: 'Dashboard', route: '/', actions: ['read'] }] },
  {
    name: 'Quản lý nhân sự',
    icon: 'UsersIcon',
    sort: 2,
    items: [
      {
        name: 'Quản lý chức vụ',
        route: '/position',
        actions: ['delete', 'create', 'update', 'read']
      },
      {
        name: 'Quản lý vị trí công việc',
        route: '/job-position',
        actions: ['delete', 'create', 'update', 'read']
      },
      {
        name: 'Quản lý phòng ban',
        route: '/department',
        actions: ['delete', 'create', 'update', 'read']
      },
      {
        name: 'Thông tin nhân sự',
        route: '/employee',
        actions: ['delete', 'create', 'update', 'read']
      },
      {
        name: 'Thông tin hợp đồng',
        route: '/contract',
        showSidebar: false,
        actions: ['delete', 'create', 'update', 'read']
      }
    ]
  },
  {
    name: 'Quản lý chấm công',
    icon: 'Square3Stack3DIcon',
    sort: 3,
    items: [
      {
        name: 'Quản lý máy chấm công',
        route: '/device',
        actions: ['delete', 'create', 'update', 'read']
      },
      {
        name: 'Quản lý ca làm việc',
        route: '/shift',
        actions: ['delete', 'create', 'update', 'read']
      },
      {
        name: 'Lịch làm việc',
        route: '/schedule',
        actions: ['delete', 'create', 'update', 'read']
      },
      {
        name: 'Quản lý chấm công',
        route: '/timekeeping',
        actions: ['delete', 'create', 'update', 'read']
      },
      {
        name: 'Lịch sử import',
        route: '/import-log',
        actions: ['read']
      }
    ]
  },
  {
    name: 'Quản lý tiền lương',
    icon: 'CircleStackIcon',
    sort: 4,
    items: [
      {
        name: 'Quản lý các khoản thưởng',
        route: '/bonus',
        actions: ['delete', 'create', 'update', 'read']
      },
      {
        name: 'Tính toán công lương',
        route: '/salary-calculation',
        actions: ['create', 'update', 'read']
      },
      {
        name: 'Phiếu lương chờ duyệt',
        route: '/pending-payslip',
        actions: ['delete', 'update', 'read']
      },
      {
        name: 'Phiếu lương đã duyệt',
        route: '/approved-payslip',
        actions: ['update', 'read']
      }
    ]
  },
  {
    name: 'Quản lý đơn từ',
    sort: 5,
    icon: 'InboxStackIcon',
    items: [
      {
        name: 'Quản lý đơn từ',
        route: '/application',
        actions: ['create', 'update', 'read']
      }
    ]
  },
  {
    name: 'Cấu hình',
    icon: 'Cog6ToothIcon',
    sort: 6,
    items: [
      {
        name: 'Phân quyền',
        route: '/permission',
        actions: ['delete', 'create', 'update', 'read']
      },
      {
        name: 'Thiết lập mẫu thông báo',
        route: '/template',
        actions: ['update', 'read']
      },
      {
        name: 'Quản lý thông báo',
        route: '/new',
        actions: ['delete', 'create', 'update', 'read']
      },
      {
        name: 'Lịch sử gửi thông báo',
        route: '/log',
        showSidebar: false,
        actions: ['update', 'read']
      }
    ]
  }
];

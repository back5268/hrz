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
    subject: '[HRZ] - Phiếu lương!',
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
  }
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
    name: 'Quản lý phê duyệt',
    sort: 5,
    icon: 'InboxStackIcon',
    items: [
      {
        name: 'Quản lý đơn từ',
        route: '/application',
        actions: ['create', 'update', 'read']
      },
      {
        name: 'Yêu cầu phê duyệt',
        route: '/request',
        actions: ['create', 'update', 'read']
      }
    ]
  },
  {
    name: 'Cấu hình',
    icon: 'Cog6ToothIcon',
    sort: 6,
    items: [
      // {
      //   name: 'Cấu hình chung',
      //   route: '/config',
      //   actions: ['update', 'read']
      // },
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

export const tools = [
  { label: 'Trang chủ', icon: 'Squares2X2Icon', route: '/' },
  {
    label: 'Quản lý nhân sự',
    icon: 'UsersIcon',
    items: [
      {
        label: 'Quản lý chức vụ',
        route: '/position'
      },
      {
        label: 'Quản lý vị trí công việc',
        route: '/job-position'
      },
      {
        label: 'Quản lý phòng ban',
        route: '/department'
      },
      {
        label: 'Thông tin nhân sự',
        route: '/personnel'
      },
      {
        label: 'Quản lý hợp đồng',
        route: '/contract'
      }
    ]
  },
  {
    label: 'Quản lý chấm công',
    icon: 'Square3Stack3DIcon',
    items: [
      {
        label: 'Đăng ký chấm công',
        route: '/register'
      },
      {
        label: 'Quản lý thiết bị chấm công',
        route: '/device'
      },
      {
        label: 'Quản lý ca làm việc',
        route: '/shift'
      },
      {
        label: 'Lịch làm việc',
        route: '/schedule'
      },
      {
        label: 'Lịch sử chấm công',
        route: '/log'
      },
      {
        label: 'Tổng hợp chấm công',
        route: '/summary'
      }
    ]
  },
  {
    label: 'Quản lý tiền lương',
    icon: 'CircleStackIcon',
    items: []
  },
  {
    label: 'Quản lý phê duyệt',
    icon: 'InboxStackIcon',
    items: []
  }
];

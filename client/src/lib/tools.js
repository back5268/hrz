export const tools = [
  { label: 'Trang chủ', icon: 'Squares2X2Icon', route: '/' },
  {
    label: 'Quản lý nhân sự',
    icon: 'UsersIcon',
    items: [
      {
        label: 'Quản lý chức vụ',
        route: '/positions'
      },
      {
        label: 'Quản lý phòng ban',
        route: '/departments'
      },
      {
        label: 'Thông tin nhân sự',
        route: '/personnels'
      },
      {
        label: 'Quản lý hợp đồng',
        route: '/contracts'
      }
    ]
  },
  {
    label: 'Quản lý chấm công',
    icon: 'Square3Stack3DIcon',
    items: [
      {
        label: 'Đăng ký chấm công',
        route: '/registers'
      },
      {
        label: 'Quản lý thiết bị chấm công',
        route: '/devices'
      },
      {
        label: 'Quản lý ca làm việc',
        route: '/shifts'
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

export const tools = [
  { label: 'Trang chủ', icon: '', href: '/' },
  {
    label: 'Quản lý nhân sự',
    icon: '',
    children: [
      {
        label: 'Quản lý chức vụ',
        href: '/positions'
      },
      {
        label: 'Quản lý phòng ban',
        href: '/departments'
      },
      {
        label: 'Thông tin nhân sự',
        href: '/personnels'
      },
      {
        label: 'Quản lý hợp đồng',
        href: '/contracts'
      }
    ]
  },
  {
    label: 'Quản lý chấm công',
    icon: '',
    children: [
      {
        label: 'Đăng ký chấm công',
        href: '/registers'
      },
      {
        label: 'Quản lý thiết bị chấm công',
        href: '/devices'
      },
      {
        label: 'Quản lý ca làm việc',
        href: '/shifts'
      },
      {
        label: 'Lịch làm việc',
        href: '/schedule'
      },
      {
        label: 'Lịch sử chấm công',
        href: '/log'
      },
      {
        label: 'Tổng hợp chấm công',
        href: '/summary'
      }
    ]
  },
  {
    label: 'Quản lý công lương',
    icon: '',
    children: [
    ]
  }
];

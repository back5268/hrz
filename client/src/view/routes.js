import { DetailNewz, DetailPermission, New, Permission, Template } from './admin/config';
import { DashBoard } from './admin/dashboard';
import { Department, DetailJobPosition, DetailEmployee, DetailPosition, JobPosition, Employee, Position } from './admin/human-resource';
import { DetailShift, Device, Schedule, Shift, Timekeeping } from './admin/timekeeping';
import { ForgotPassword, SignIn } from './auth';

export const routes = [
  { path: '/auth/sign-in', element: SignIn, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },

  { path: '/', element: DashBoard, layout: true },
  { path: '/position', element: Position, layout: true },
  { path: '/position/create', element: DetailPosition, layout: true },
  { path: '/position/detail/:_id', element: DetailPosition, layout: true },
  { path: '/job-position', element: JobPosition, layout: true },
  { path: '/job-position/create', element: DetailJobPosition, layout: true },
  { path: '/job-position/detail/:_id', element: DetailJobPosition, layout: true },
  { path: '/department', element: Department, layout: true },
  { path: '/employee', element: Employee, layout: true },
  { path: '/employee/create', element: DetailEmployee, layout: true },
  { path: '/employee/detail/:_id', element: DetailEmployee, layout: true },

  { path: '/device', element: Device, layout: true },
  { path: '/shift', element: Shift, layout: true },
  { path: '/shift/create', element: DetailShift, layout: true },
  { path: '/shift/detail/:_id', element: DetailShift, layout: true },
  { path: '/schedule', element: Schedule, layout: true },
  { path: '/timekeeping', element: Timekeeping, layout: true },

  { path: '/permission', element: Permission, layout: true },
  { path: '/permission/create', element: DetailPermission, layout: true },
  { path: '/permission/detail/:_id', element: DetailPermission, layout: true },
  { path: '/template', element: Template, layout: true },
  { path: '/new', element: New, layout: true },
  { path: '/new/create', element: DetailNewz, layout: true },
  { path: '/new/detail/:_id', element: DetailNewz, layout: true },
];

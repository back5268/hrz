import { DetailNotifyz, DetailPermission, Notify, Permission, Template } from './admin/config';
import { DashBoard } from './admin/dashboard';
import { Department, DetailJobPosition, DetailPersonnel, DetailPosition, JobPosition, Personnel, Position } from './admin/human-resource';
import { Device, Registers, Schedule, Shifts, TimekeepingLog, TimekeepingSummary } from './admin/timekeeping';
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
  { path: '/personnel', element: Personnel, layout: true },
  { path: '/personnel/create', element: DetailPersonnel, layout: true },
  { path: '/personnel/detail/:_id', element: DetailPersonnel, layout: true },

  { path: '/device', element: Device, layout: true },
  { path: '/register', element: Registers, layout: true },
  { path: '/shift', element: Shifts, layout: true },
  { path: '/schedule', element: Schedule, layout: true },
  { path: '/timekeeping-log', element: TimekeepingLog, layout: true },
  { path: '/timekeeping-summary', element: TimekeepingSummary, layout: true },

  { path: '/permission', element: Permission, layout: true },
  { path: '/permission/create', element: DetailPermission, layout: true },
  { path: '/permission/detail/:_id', element: DetailPermission, layout: true },
  { path: '/template', element: Template, layout: true },
  { path: '/notify', element: Notify, layout: true },
  { path: '/notify/create', element: DetailNotifyz, layout: true },
  { path: '/notify/detail/:_id', element: DetailNotifyz, layout: true },
];

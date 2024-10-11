import { Template } from './admin/config';
import { DashBoard } from './admin/dashboard';
import { Department, DetailJobPosition, DetailPersonnel, JobPosition, Personnel, Position } from './admin/human-resource';
import { Device, Registers, Schedule, Shifts, TimekeepingLog, TimekeepingSummary } from './admin/timekeeping';
import { ForgotPassword, SignIn } from './auth';

export const routes = [
  { path: '/auth/sign-in', element: SignIn, public: true },
  { path: '/auth/forgot-password', element: ForgotPassword, public: true },

  { path: '/', element: DashBoard, layout: true },
  { path: '/position', element: Position, layout: true },
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

  { path: '/template', element: Template, layout: true }
];

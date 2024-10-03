import { DashBoard } from "./admin/dashboard";
import { Contracts, Departments, Personnels, Positions } from "./admin/human-resource-management";
import { Devices, Registers, Schedule, Shifts, TimekeepingLog, TimekeepingSummary } from "./admin/timekeeping-management";
import { ForgotPassword, SignIn } from "./auth";

export const routes = [
    { path: '/auth/sign-in', element: SignIn, public: true },
    { path: '/auth/forgot-password', element: ForgotPassword, public: true },

    { path: '/', element: DashBoard, layout: true },
    { path: '/departments', element: Departments, layout: true },
    { path: '/positions', element: Positions, layout: true },
    { path: '/personnels', element: Personnels, layout: true },
    { path: '/contracts', element: Contracts, layout: true },

    { path: '/devices', element: Devices, layout: true },
    { path: '/registers', element: Registers, layout: true },
    { path: '/shifts', element: Shifts, layout: true },
    { path: '/schedule', element: Schedule, layout: true },
    { path: '/timekeeping-log', element: TimekeepingLog, layout: true },
    { path: '/timekeeping-summary', element: TimekeepingSummary, layout: true },
];

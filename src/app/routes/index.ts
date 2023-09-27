import express from 'express';
import { AuthRoute } from '../modules/auth/auth.routes';
import profileRoutes from '../modules/auth/profile.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/profile',
    route: profileRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;

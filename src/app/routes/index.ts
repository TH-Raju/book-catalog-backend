import express from 'express';
import { AuthRoute } from '../modules/auth/auth.routes';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router;

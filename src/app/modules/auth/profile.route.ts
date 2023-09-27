import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { authcontroller } from './auth.controller';
const router = express.Router();
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  authcontroller.getUserProfile
);

const profileRoutes = router;
export default profileRoutes;

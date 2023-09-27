import express from 'express';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from './../../../enums/user';
import { orderController } from './order.controller';
const router = express.Router();

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  orderController.createAorder
);
router.get(
  '/all-order',
  auth(ENUM_USER_ROLE.ADMIN),
  orderController.getSingleOrder
);

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  orderController.getSingleOrder
);

export const orderRoutes = router;

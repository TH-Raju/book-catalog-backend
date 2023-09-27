import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { usercontroller } from './user.controller';

const router = express.Router();
router.get('/', auth(ENUM_USER_ROLE.ADMIN), usercontroller.getalluser);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), usercontroller.getsingleuser);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), usercontroller.updateuser);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), usercontroller.deleteuser);

export const userRoutes = router;

import express from 'express';
import { usercontroller } from './user.controller';

const router = express.Router();
router.get('/', usercontroller.getalluser);
router.get('/:id', usercontroller.getsingleuser);
router.patch('/:id',usercontroller.updateuser)

export const userRoutes = router;

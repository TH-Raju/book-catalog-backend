import express from 'express';
import { usercontroller } from './user.controller';

const router = express.Router();
router.get('/', usercontroller.getalluser);
router.get('/:id', usercontroller.getsingleuser);
export const userRoutes = router;

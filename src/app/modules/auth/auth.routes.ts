import express from 'express';
import { authcontroller } from './auth.controller';

const router = express.Router();

router.post('/signup', authcontroller.createauthUser);
router.post('/signin', authcontroller.loginUser);

export const AuthRoute = router;

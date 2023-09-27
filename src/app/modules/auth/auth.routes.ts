import express from 'express';
import { authcontroller } from './auth.controller';

const router = express.Router();

router.post('/signup', authcontroller.createauthUser);

export const AuthRoute = router;

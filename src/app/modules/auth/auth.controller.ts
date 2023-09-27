import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { authservices } from './auth.service';

const createauthUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authservices.createAuthUser(req.body);

  res.send({
    success: true,
    statusCode: 200,
    message: 'Users created successfully',
    data: result,
  });
});

export const authcontroller = {
  createauthUser,
};

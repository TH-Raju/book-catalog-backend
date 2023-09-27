import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { userservice } from './user.service';

const getalluser = catchAsync(async (req: Request, res: Response) => {
  const result = await userservice.getallUser();
  res.send({
    success: true,
    statusCode: 200,
    message: 'Users retrieved  successfully',
    data: result,
  });
});

// getsingle
const getsingleuser = catchAsync(async (req: Request, res: Response) => {
  const result = await userservice.getSingleUser(req.params.id);
  res.send({
    success: true,
    statusCode: 200,
    message: 'User retrieved  successfully',
    data: result,
  });
});

export const usercontroller = {
  getalluser,
  getsingleuser,
};

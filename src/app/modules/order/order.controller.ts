import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { orderServices } from './order.service';

const createAorder = catchAsync(async (req: Request, res: Response) => {
  console.log(req.user);
  const result = await orderServices.createOrder(req.user, req.body);
  res.send({
    success: true,
    statusCode: 200,
    message: 'orders created  successfully',
    data: result,
  });
});

export const orderController = {
  createAorder,
};

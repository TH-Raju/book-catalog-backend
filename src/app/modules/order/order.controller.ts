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

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const result = await orderServices.getAllOrders();
  res.send({
    success: true,
    statusCode: 200,
    message: 'orders retrive  successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderServices.getSingleOrder(req.user);
  res.send({
    success: true,
    statusCode: 200,
    message: 'orders retrive  successfully',
    data: result,
  });
});

const getspecificOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await orderServices.getspecificOrder(req.params.id, req.user);
  res.send({
    success: true,
    statusCode: 200,
    message: 'orders retrive  successfully',
    data: result,
  });
});

export const orderController = {
  createAorder,
  getAllOrders,
  getSingleOrder,
  getspecificOrder,
};

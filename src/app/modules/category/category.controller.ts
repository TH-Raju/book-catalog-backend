import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { categoryServices } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.createCategory(req.body);
  res.send({
    success: true,
    statusCode: 200,
    message: 'Category created successfully',
    data: result,
  });
});

const getallcateGories = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getallcateGories();
  res.send({
    success: true,
    statusCode: 200,
    message: 'categories retrieved  successfully',
    data: result,
  });
});

export const categoryController = {
  createCategory,
  getallcateGories,
};

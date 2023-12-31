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

// getsingle
const getsingleCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.getsingleCategory(req.params.id);
  res.send({
    success: true,
    statusCode: 200,
    message: 'category fetched  successfully',
    data: result,
  });
});

// update category
const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.updateCategory(req.params.id, req.body);
  res.send({
    success: true,
    statusCode: 200,
    message: 'category updated   successfully',
    data: result,
  });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await categoryServices.deleteCategory(req.params.id);
  res.send({
    success: true,
    statusCode: 200,
    message: 'category deleted   successfully',
    data: result,
  });
});

export const categoryController = {
  createCategory,
  getallcateGories,
  getsingleCategory,
  updateCategory,
  deleteCategory,
};

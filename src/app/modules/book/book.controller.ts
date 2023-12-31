import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { booksfilterableOptions } from './book.constant';
import { booksServices } from './book.service';

const createBooks = catchAsync(async (req: Request, res: Response) => {
  //   console.log(req.body);
  const result = await booksServices.createBooks(req.body);
  res.send({
    success: true,
    statusCode: 200,
    message: 'books  created successfully',
    data: result,
  });
});

const getallbooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, booksfilterableOptions);
  const options = pick(req.query, [
    'limit',
    'page',
    'skip',
    'sortBy',
    'sortOrder',
  ]);
  const result = await booksServices.getallbooks(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, [
    'limit',
    'page',
    'skip',
    'sortBy',
    'sortOrder',
  ]);
  const result = await booksServices.getBooksByCategoryId(
    req.params.categoryId,
    options
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// single book
const getsingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await booksServices.getsingleBook(req.params.id);
  res.send({
    success: true,
    statusCode: 200,
    message: 'book retrieved  successfully',
    data: result,
  });
});

const updateSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await booksServices.updateSingleBook(req.params.id, req.body);
  res.send({
    success: true,
    statusCode: 200,
    message: 'book updated   successfully',
    data: result,
  });
});

// delete
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const result = await booksServices.deleteBook(req.params.id);
  res.send({
    success: true,
    statusCode: 200,
    message: 'book deleted   successfully',
    data: result,
  });
});

export const booksController = {
  createBooks,
  getallbooks,
  getBooksByCategoryId,
  getsingleBook,
  updateSingleBook,
  deleteBook,
};

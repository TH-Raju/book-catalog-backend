import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
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

export const booksController = {
  createBooks,
};

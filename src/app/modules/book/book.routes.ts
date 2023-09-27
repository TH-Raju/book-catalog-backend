import express from 'express';
import { booksController } from './book.controller';

const router = express.Router();
router.post('/create-book', booksController.createBooks);
router.get('/', booksController.getallbooks);
router.get('/:categoryId/category', booksController.getBooksByCategoryId);
export const booksRoutes = router;

import express from 'express';
import { booksController } from './book.controller';

const router = express.Router();
router.post('/create-book', booksController.createBooks);

export const booksRoutes = router;

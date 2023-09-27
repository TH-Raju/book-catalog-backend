"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post('/create-book', book_controller_1.booksController.createBooks);
router.get('/', book_controller_1.booksController.getallbooks);
router.get('/:categoryId/category', book_controller_1.booksController.getBooksByCategoryId);
router.get('/:id', book_controller_1.booksController.getsingleBook);
router.patch('/:id', book_controller_1.booksController.updateSingleBook);
router.delete('/:id', book_controller_1.booksController.deleteBook);
exports.booksRoutes = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const book_constant_1 = require("./book.constant");
const book_service_1 = require("./book.service");
const createBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log(req.body);
    const result = yield book_service_1.booksServices.createBooks(req.body);
    res.send({
        success: true,
        statusCode: 200,
        message: 'books  created successfully',
        data: result,
    });
}));
const getallbooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, pick_1.default)(req.query, book_constant_1.booksfilterableOptions);
    const options = (0, pick_1.default)(req.query, [
        'limit',
        'page',
        'skip',
        'sortBy',
        'sortOrder',
    ]);
    const result = yield book_service_1.booksServices.getallbooks(filters, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'books fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
const getBooksByCategoryId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = (0, pick_1.default)(req.query, [
        'limit',
        'page',
        'skip',
        'sortBy',
        'sortOrder',
    ]);
    const result = yield book_service_1.booksServices.getBooksByCategoryId(req.params.categoryId, options);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'books fetched successfully',
        meta: result.meta,
        data: result.data,
    });
}));
// single book
const getsingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.booksServices.getsingleBook(req.params.id);
    res.send({
        success: true,
        statusCode: 200,
        message: 'book retrieved  successfully',
        data: result,
    });
}));
const updateSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.booksServices.updateSingleBook(req.params.id, req.body);
    res.send({
        success: true,
        statusCode: 200,
        message: 'book updated   successfully',
        data: result,
    });
}));
// delete
const deleteBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.booksServices.deleteBook(req.params.id);
    res.send({
        success: true,
        statusCode: 200,
        message: 'book deleted   successfully',
        data: result,
    });
}));
exports.booksController = {
    createBooks,
    getallbooks,
    getBooksByCategoryId,
    getsingleBook,
    updateSingleBook,
    deleteBook,
};

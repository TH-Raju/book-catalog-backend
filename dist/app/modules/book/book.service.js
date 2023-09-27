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
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const book_constant_1 = require("./book.constant");
const createBooks = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        }
    });
    return result;
});
const getallbooks = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, minPrice, maxPrice, category } = filters;
    const { limit, skip, page } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: book_constant_1.booksSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: "insensitive"
                }
            }))
        });
    }
    if (minPrice !== undefined) {
        const minPrices = parseFloat(minPrice);
        if (!isNaN(minPrices)) {
            andConditions.push({
                price: {
                    gte: minPrices,
                },
            });
            console.log("MinPrice is used");
        }
    }
    if (maxPrice !== undefined) {
        const maxPrices = parseFloat(maxPrice);
        if (!isNaN(maxPrices)) {
            andConditions.push({
                price: {
                    lte: maxPrices,
                },
            });
            console.log("MaxPrice is used");
        }
    }
    if (category !== undefined) {
        andConditions.push({
            categoryId: {
                equals: category,
            }
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const count = yield prisma_1.default.book.count({
        where: whereConditions
    });
    const result = yield prisma_1.default.book.findMany({
        where: whereConditions,
        include: {
            category: true
        },
        skip,
        take: limit
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'something went wrong');
    }
    return {
        meta: {
            total: count,
            page,
            limit
        },
        data: result
    };
});
// get books by category id 
const getBooksByCategoryId = (id, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit, skip, page } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const total = yield prisma_1.default.book.count({
        where: {
            categoryId: {
                equals: id
            }
        }
    });
    const result = yield prisma_1.default.book.findMany({
        where: {
            categoryId: {
                equals: id
            }
        },
        skip,
        take: limit,
        include: {
            category: true
        }
    });
    return {
        meta: {
            total,
            page,
            limit
        },
        data: result
    };
});
// get single book 
const getsingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.findUnique({
        where: {
            id
        },
        include: {
            category: true
        }
    });
    return result;
});
//   update single books 
const updateBook = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.book.update({
        where: {
            id
        },
        include: {
            category: true
        },
        data
    });
    return result;
});
// delete
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let deletedBook = null;
    yield prisma_1.default.$transaction((prismaClient) => __awaiter(void 0, void 0, void 0, function* () {
        const ordersWithBook = yield prismaClient.order.findMany({
            where: {
                orderedBooks: {
                    some: {
                        bookId: id,
                    },
                },
            },
        });
        yield Promise.all(ordersWithBook.map((order) => __awaiter(void 0, void 0, void 0, function* () {
            yield prismaClient.orderedBook.deleteMany({
                where: {
                    orderId: order.id,
                    bookId: id,
                },
            });
        })));
        deletedBook = yield prismaClient.book.delete({
            where: {
                id,
            },
            include: {
                category: true,
            },
        });
    }));
    return deletedBook;
});
const booksServices = {
    createBooks,
    getallbooks,
    getBooksByCategoryId,
    getsingleBook,
    updateBook,
    deleteBook
};
exports.default = booksServices;

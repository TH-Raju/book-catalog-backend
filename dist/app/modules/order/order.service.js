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
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createOrder = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, role } = token;
    if (role !== "customer") {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Only customers can create an order");
    }
    const orderedBooks = data.orderedBooks; // Get the ordered books data
    const orders = yield prisma_1.default.$transaction((prismaClient) => __awaiter(void 0, void 0, void 0, function* () {
        const createdOrder = yield prismaClient.order.create({
            data: {
                userId,
            },
            include: {
                orderedBooks: true,
            }
        });
        const orderedBooksData = orderedBooks.map((orderedBook) => {
            const { bookId, quantity } = orderedBook;
            return {
                orderId: createdOrder.id,
                bookId,
                quantity,
            };
        });
        yield prismaClient.orderedBook.createMany({
            data: orderedBooksData,
        });
        const { id } = createdOrder;
        const showOrder = yield prismaClient.order.findFirst({
            where: {
                id // Replace with the actual order ID you want to retrieve
            },
            include: {
                orderedBooks: {
                    include: {
                        book: true,
                    },
                },
            },
        });
        return showOrder;
    }));
    return orders;
});
//   get all orders
// const getAllOrders =  async():Promise<Order[]>=>{
//     const result  = await prisma.order.findMany({
//         include:{
//             orderedBooks:{
//                 include:{
//                     book:true
//                 }
//             }
//         }
//     })
//     return result
// }
const getSingleOrder = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, userId } = token;
    let result;
    if (role && role === "admin") {
        result = yield prisma_1.default.order.findMany({
            include: {
                orderedBooks: {
                    include: {
                        book: true
                    }
                }
            }
        });
    }
    else if (role && role === "customer") {
        result = yield prisma_1.default.order.findMany({
            where: {
                userId: {
                    equals: userId
                },
            },
            include: {
                orderedBooks: {
                    include: {
                        book: true
                    }
                }
            }
        });
    }
    if (!result || result.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    return result;
});
// bonus part get specific order 
const getspecificOrder = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, userId } = token;
    let result;
    if (role && role === "admin") {
        result = yield prisma_1.default.order.findMany({
            where: {
                id
            },
            include: {
                orderedBooks: {
                    include: {
                        book: true
                    }
                }
            }
        });
    }
    else if (role && role === "customer") {
        result = yield prisma_1.default.order.findMany({
            where: {
                id,
                userId: {
                    equals: userId
                },
            },
            include: {
                orderedBooks: {
                    include: {
                        book: true
                    }
                }
            }
        });
    }
    if (!result || result.length === 0) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order not found');
    }
    return result;
});
const orderServices = {
    createOrder,
    getSingleOrder,
    getspecificOrder
};
exports.default = orderServices;

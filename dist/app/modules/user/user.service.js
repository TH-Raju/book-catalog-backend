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
// get all user
const getallUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
        include: {
            orders: true,
            reviews: true
        }
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'something went wrong');
    }
    return result;
});
//   get single user 
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id
        },
        include: {
            orders: true,
            reviews: true
        }
    });
    return result;
});
//   update
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id
        },
        include: {
            orders: true,
            reviews: true
        },
        data
    });
    return result;
});
//   delete 
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const findOrder = yield tx.order.findMany({
            where: {
                userId: id
            }
        });
        yield Promise.all(findOrder.map((order) => __awaiter(void 0, void 0, void 0, function* () {
            yield tx.orderedBook.deleteMany({
                where: {
                    orderId: order === null || order === void 0 ? void 0 : order.id
                }
            });
        })));
        yield tx.order.deleteMany({
            where: {
                userId: id
            }
        });
    }));
    const result = yield prisma_1.default.user.delete({
        where: {
            id
        },
        include: {
            orders: true,
            reviews: true
        }
    });
    return result;
});
const userservice = {
    getallUser,
    getSingleUser,
    updateUser,
    deleteUser
};
exports.default = userservice;

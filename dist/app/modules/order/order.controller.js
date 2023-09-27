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
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const order_service_1 = __importDefault(require("./order.service"));
const createAorder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.user);
    const result = yield order_service_1.default.createOrder(req.user, req.body);
    res.send({
        success: true,
        statusCode: 200,
        message: 'orders created  successfully',
        data: result,
    });
}));
// const getAllOrders  =  catchAsync(async(req:Request,res:Response)=>{
//     const result  = await orderServices.getAllOrders()
//     res.send({
//         success: true,
//         statusCode: 200,
//         message: 'orders retrive  successfully',
//         data: result,
//       })
// })
const getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.default.getSingleOrder(req.user);
    res.send({
        success: true,
        statusCode: 200,
        message: 'orders retrive  successfully',
        data: result,
    });
}));
const getspecificOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_service_1.default.getspecificOrder(req.params.id, req.user);
    res.send({
        success: true,
        statusCode: 200,
        message: 'orders retrive  successfully',
        data: result,
    });
}));
const orderController = {
    createAorder,
    getspecificOrder,
    getSingleOrder
};
exports.default = orderController;

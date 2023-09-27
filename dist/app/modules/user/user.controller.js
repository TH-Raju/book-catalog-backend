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
const user_service_1 = __importDefault(require("./user.service"));
const getalluser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.default.getallUser();
    res.send({
        success: true,
        statusCode: 200,
        message: 'Users retrieved  successfully',
        data: result,
    });
}));
// getsingle 
const getsingleuser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.default.getSingleUser(req.params.id);
    res.send({
        success: true,
        statusCode: 200,
        message: 'User retrieved  successfully',
        data: result,
    });
}));
// update
const updateuser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.default.updateUser(req.params.id, req.body);
    res.send({
        success: true,
        statusCode: 200,
        message: 'User updated   successfully',
        data: result,
    });
}));
const deleteuser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.default.deleteUser(req.params.id);
    res.send({
        success: true,
        statusCode: 200,
        message: 'User deleted   successfully',
        data: result,
    });
}));
const usercontroller = {
    getalluser,
    getsingleuser,
    updateuser,
    deleteuser
};
exports.default = usercontroller;

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
const category_service_1 = __importDefault(require("./category.service"));
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.default.createCategory(req.body);
    res.send({
        success: true,
        statusCode: 200,
        message: "Category created successfully",
        data: result
    });
}));
const updateCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.default.updateCategory(req.params.id, req.body);
    res.send({
        success: true,
        statusCode: 200,
        message: 'category updated   successfully',
        data: result,
    });
}));
const getallcateGories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.default.getallcateGories();
    res.send({
        success: true,
        statusCode: 200,
        message: 'categories retrieved  successfully',
        data: result,
    });
}));
// getsingle 
const getsingleCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.default.getsingleCategory(req.params.id);
    res.send({
        success: true,
        statusCode: 200,
        message: 'category retrieved  successfully',
        data: result,
    });
}));
const deleteCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.default.deleteCategory(req.params.id);
    res.send({
        success: true,
        statusCode: 200,
        message: 'category deleted   successfully',
        data: result,
    });
}));
const categoryController = {
    createCategory,
    updateCategory,
    deleteCategory,
    getsingleCategory,
    getallcateGories
};
exports.default = categoryController;

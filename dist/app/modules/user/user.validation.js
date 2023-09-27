"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = __importDefault(require("zod"));
const createUserSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string(),
        email: zod_1.default.string().email(),
        password: zod_1.default.string(),
        role: zod_1.default.enum(['admin', 'customer']),
        contactNo: zod_1.default.string(),
        address: zod_1.default.string(),
        profileImg: zod_1.default.string().url(),
    })
});
const updateUserSchema = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string().optional(),
        email: zod_1.default.string().email().optional(),
        password: zod_1.default.string().optional(),
        role: zod_1.default.enum(['admin', 'customer']).optional(),
        contactNo: zod_1.default.string().optional(),
        address: zod_1.default.string().optional(),
        profileImg: zod_1.default.string().url().optional(),
    })
});
const userzodvalidation = {
    createUserSchema,
    updateUserSchema
};
exports.default = userzodvalidation;

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
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createAuthUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield bcrypt_1.default.hash(data === null || data === void 0 ? void 0 : data.password, Number(config_1.default.bycrypt_salt_rounds));
    data.password = password;
    const result = yield prisma_1.default.user.create({
        data,
        include: {
            orders: true,
            reviews: true,
        },
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'something went wrong');
    }
    return result;
});
const loginuser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = data;
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email: email
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "user not exist");
    }
    const decriptedPassword = yield bcrypt_1.default.compare(password, isUserExist.password);
    if ((isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password) && !decriptedPassword) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "password is incorrect");
    }
    const accessToken = jwtHelpers_1.jwthelper.createToken({ userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id, email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email, role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role }, config_1.default.jwt.secret, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const refreshToken = jwtHelpers_1.jwthelper.createToken({ userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id, email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email, role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role }, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.refresh_expires_in,
    });
    return {
        accessToken,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifyToken = null;
    try {
        verifyToken = jwtHelpers_1.jwthelper.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(404, 'invalid token');
    }
    // step 2 cheek if user exists or not
    const isUserExist = yield prisma_1.default.user.findUnique({
        where: {
            email: verifyToken === null || verifyToken === void 0 ? void 0 : verifyToken.email
        }
    });
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "user not exist");
    }
    // const { email } = isUserExist
    // step 3 generate new token
    const accessToken = jwtHelpers_1.jwthelper.createToken({ id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id, email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email, role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role }, config_1.default.jwt.secret, {
        expiresIn: config_1.default.jwt.expires_in,
    });
    return {
        accessToken,
    };
});
// profile
const getUserProfile = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const { role, userId } = token;
    const result = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
            role
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            contactNo: true,
            address: true,
            profileImg: true
        }
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "user not found");
    }
    return result;
});
const authservices = {
    createAuthUser,
    loginuser,
    refreshToken,
    getUserProfile
};
exports.default = authservices;

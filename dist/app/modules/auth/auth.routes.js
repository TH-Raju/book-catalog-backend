"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const router = express_1.default.Router();
router.post('/signup', auth_controller_1.default.createauthUser);
router.post('/login', auth_controller_1.default.loginUser);
router.post('/refreshtoken', auth_controller_1.default.refreshToken);
// router.post('/refresh-token', authcontroller.refreshToken)
const AuthRoute = router;
exports.default = AuthRoute;

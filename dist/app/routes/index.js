"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("../modules/auth/auth.routes");
const profile_route_1 = __importDefault(require("../modules/auth/profile.route"));
const book_routes_1 = require("../modules/book/book.routes");
const category_routes_1 = require("../modules/category/category.routes");
const order_routes_1 = require("../modules/order/order.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRoute,
    },
    {
        path: '/users',
        route: user_routes_1.userRoutes,
    },
    {
        path: '/categories',
        route: category_routes_1.categoryRoutes,
    },
    {
        path: '/books',
        route: book_routes_1.booksRoutes,
    },
    {
        path: '/orders',
        route: order_routes_1.orderRoutes,
    },
    {
        path: '/profile',
        route: profile_route_1.default,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;

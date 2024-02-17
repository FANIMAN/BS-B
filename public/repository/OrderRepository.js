"use strict";
// src/repository/OrderRepository.ts
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
const DatabaseService_1 = __importDefault(require("../service/DatabaseService"));
class OrderRepository {
    static getOrderById(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield DatabaseService_1.default.oneOrNone('SELECT * FROM orders WHERE id = $1', [orderId]);
                return order;
            }
            catch (error) {
                // Handle any database errors or exceptions
                console.error('Error fetching order by ID:', error);
                return null;
            }
        });
    }
    static getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield DatabaseService_1.default.manyOrNone('SELECT * FROM orders');
            return orders;
        });
    }
    static createOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield DatabaseService_1.default.one('INSERT INTO orders (customer_id, book_id, quantity) VALUES ($1, $2, $3) RETURNING *', [order.customerId, order.bookId, order.quantity]);
            return result;
        });
    }
    static cancelOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield DatabaseService_1.default.result('DELETE FROM orders WHERE id = $1', [orderId]);
                if (!result) {
                    console.error('Order not found');
                    throw new Error('Order not found');
                }
            }
            catch (error) {
                console.error('Error cancelling order:', error);
                throw new Error('Failed to cancel order');
            }
        });
    }
    static getOrdersByCustomerId(customerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield DatabaseService_1.default.manyOrNone('SELECT * FROM orders WHERE customer_id = $1', [customerId]);
            return orders;
        });
    }
}
exports.default = OrderRepository;

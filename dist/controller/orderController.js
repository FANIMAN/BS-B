"use strict";
// src/controller/OrderController.ts
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
const OrderRepository_1 = __importDefault(require("../repository/OrderRepository"));
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const Order_1 = __importDefault(require("../entity/Order"));
class OrderController {
    static getOrderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = parseInt(req.params.id);
                const order = yield OrderRepository_1.default.getOrderById(orderId);
                if (order) {
                    res.status(200).json(order);
                }
                else {
                    res.status(404).send('Order not found');
                }
            }
            catch (error) {
                console.error('Error retrieving order:', error);
                res.status(500).send('Failed to retrieve order');
            }
        });
    }
    static getAllOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield OrderRepository_1.default.getAllOrders();
                res.status(200).json(orders);
            }
            catch (error) {
                console.error('Error retrieving orders:', error);
                res.status(500).send('Failed to retrieve orders');
            }
        });
    }
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { customerId, bookId, quantity } = req.body;
                const order = new Order_1.default(0, customerId, bookId, quantity);
                const newOrder = yield OrderRepository_1.default.createOrder(order);
                res.status(201).json(newOrder);
            }
            catch (error) {
                console.error('Error creating order:', error);
                res.status(500).send('Failed to create order');
            }
        });
    }
    static cancelOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = parseInt(req.params.id);
                yield OrderRepository_1.default.cancelOrder(orderId);
                res.status(204).send('Successfully cancelled Order');
            }
            catch (error) {
                console.error('Error cancelling order:', error);
                res.status(500).send('Failed to cancel order');
            }
        });
    }
    // static async getOrdersByCustomerId(req: Request, res: Response) {
    //     try {
    //         // Assuming you have some middleware to extract user role from the request object
    //         const userRole = req.user.role;
    //         const userId = parseInt(req.params.customer_id);
    //         let orders;
    //         if (userRole === 'admin') {
    //             // Fetch all orders
    //             orders = await OrderRepository.getAllOrders();
    //         } else if (userRole === 'customer') {
    //             // Fetch orders for the specific customer
    //             orders = await OrderRepository.getOrdersByCustomerId(userId);
    //         } else {
    //             // If the user role is neither admin nor customer, return an error
    //             return res.status(403).json({ error: 'Unauthorized' });
    //         }
    //         res.json(orders);
    //     } catch (error) {
    //         console.error('Error fetching orders by customer ID:', error);
    //         res.status(500).json({ error: 'Failed to fetch orders by customer ID' });
    //     }
    // }
    // static async getOrdersByCustomerId(req: Request, res: Response) {
    //     try {
    //         const userId = parseInt(req.params.customer_id);
    //         if (isNaN(userId)) {
    //             return res.status(400).json({ error: 'Invalid customer ID' });
    //         }
    //         const orders = await OrderRepository.getOrdersByCustomerId(userId);
    //         res.json(orders);
    //     } catch (error) {
    //         console.error('Error fetching orders by customer ID:', error);
    //         res.status(500).json({ error: 'Failed to fetch orders by customer ID' });
    //     }
    // }
    static getOrdersByCustomerId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.customer_id);
                if (isNaN(userId)) {
                    return res.status(400).json({ error: 'Invalid customer ID' });
                }
                // Find user by ID
                const user = yield UserRepository_1.default.getUserById(userId);
                console.log(user);
                if (!user) {
                    return res.status(404).json({ error: 'User not found' });
                }
                let orders;
                // Fetch orders based on user's role
                if (user.role === 'admin') {
                    // Fetch all orders
                    orders = yield OrderRepository_1.default.getAllOrders();
                }
                else if (user.role === 'customer') {
                    // Fetch orders for the specific customer
                    orders = yield OrderRepository_1.default.getOrdersByCustomerId(userId);
                }
                else {
                    // If the user role is neither admin nor customer, return an error
                    return res.status(403).json({ error: 'Unauthorized' });
                }
                res.json(orders);
            }
            catch (error) {
                console.error('Error fetching orders by customer ID:', error);
                res.status(500).json({ error: 'Failed to fetch orders by customer ID' });
            }
        });
    }
}
exports.default = OrderController;

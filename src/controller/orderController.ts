// src/controller/OrderController.ts

import { Request, Response } from 'express';
import OrderRepository from '../repository/OrderRepository';
import UserRepository from '../repository/UserRepository';

import Order from '../entity/Order';

class OrderController {

    static async getOrderById(req: Request, res: Response): Promise<void> {
        try {
            const orderId = parseInt(req.params.id);
            const order = await OrderRepository.getOrderById(orderId);
            if (order) {
                res.status(200).json(order);
            } else {
                res.status(404).send('Order not found');
            }
        } catch (error) {
            console.error('Error retrieving order:', error);
            res.status(500).send('Failed to retrieve order');
        }
    }


    static async getAllOrders(req: Request, res: Response): Promise<void> {
        try {
            const orders = await OrderRepository.getAllOrders();
            res.status(200).json(orders);
        } catch (error) {
            console.error('Error retrieving orders:', error);
            res.status(500).send('Failed to retrieve orders');
        }
    }


    static async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const { customerId, bookId, quantity } = req.body;
            const order = new Order(0, customerId, bookId, quantity);
            const newOrder = await OrderRepository.createOrder(order);
            res.status(201).json(newOrder);
        } catch (error) {
            console.error('Error creating order:', error);
            res.status(500).send('Failed to create order');
        }
    }

    static async cancelOrder(req: Request, res: Response): Promise<void> {
        try {
            const orderId = parseInt(req.params.id);
            await OrderRepository.cancelOrder(orderId);
            res.status(204).send('Successfully cancelled Order');
        } catch (error) {
            console.error('Error cancelling order:', error);
            res.status(500).send('Failed to cancel order');
        }
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


    static async getOrdersByCustomerId(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.customer_id);
            if (isNaN(userId)) {
                return res.status(400).json({ error: 'Invalid customer ID' });
            }

            // Find user by ID
            const user = await UserRepository.getUserById(userId);
            console.log(user)
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            let orders;

            // Fetch orders based on user's role
            if (user.role === 'admin') {
                // Fetch all orders
                orders = await OrderRepository.getAllOrders();
            } else if (user.role === 'customer') {
                // Fetch orders for the specific customer
                orders = await OrderRepository.getOrdersByCustomerId(userId);
            } else {
                // If the user role is neither admin nor customer, return an error
                return res.status(403).json({ error: 'Unauthorized' });
            }

            res.json(orders);
        } catch (error) {
            console.error('Error fetching orders by customer ID:', error);
            res.status(500).json({ error: 'Failed to fetch orders by customer ID' });
        }
    }

    // Add other controller methods as needed
}

export default OrderController;

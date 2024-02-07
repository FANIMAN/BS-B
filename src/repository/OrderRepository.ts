// src/repository/OrderRepository.ts

import db from '../service/DatabaseService';
import Order from '../entity/Order';
import { NotFoundError } from '../utils/errors';


class OrderRepository {

    static async getOrderById(orderId: number): Promise<Order | null> {
        try {
            const order = await db.oneOrNone('SELECT * FROM orders WHERE id = $1', [orderId]);
            return order;
        } catch (error) {
            // Handle any database errors or exceptions
            console.error('Error fetching order by ID:', error);
            return null;
        }
    }


    static async getAllOrders(): Promise<Order[]> {
        const orders = await db.manyOrNone('SELECT * FROM orders');
        return orders;
    }



    static async createOrder(order: Order): Promise<Order> {
        const result = await db.one(
            'INSERT INTO orders (customer_id, book_id, quantity) VALUES ($1, $2, $3) RETURNING *',
            [order.customerId, order.bookId, order.quantity]
        );
        return result;
    }

    static async cancelOrder(orderId: number): Promise<void> {
        try {
            const result = await db.result('DELETE FROM orders WHERE id = $1', [orderId]);
            if (!result) {
                console.error('Order not found');
                throw new Error('Order not found');
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
            throw new Error('Failed to cancel order');
        }
        
    }

    static async getOrdersByCustomerId(customerId: number): Promise<Order[]> {
        const orders = await db.manyOrNone('SELECT * FROM orders WHERE customer_id = $1', [customerId]);
        return orders;
    }
    

    // Add other CRUD operations as needed
}

export default OrderRepository;

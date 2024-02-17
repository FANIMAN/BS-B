"use strict";
// src/entity/Order.ts
Object.defineProperty(exports, "__esModule", { value: true });
class Order {
    constructor(id, customerId, bookId, quantity) {
        this.id = id;
        this.customerId = customerId;
        this.bookId = bookId;
        this.quantity = quantity;
    }
}
exports.default = Order;

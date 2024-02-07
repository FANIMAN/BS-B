// src/entity/Order.ts

export default class Order {
    id: number;
    customerId: number;
    bookId: number;
    quantity: number;
  
    constructor(id: number, customerId: number, bookId: number, quantity: number) {
      this.id = id;
      this.customerId = customerId;
      this.bookId = bookId;
      this.quantity = quantity;
    }
}

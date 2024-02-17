"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    constructor(title, writer, image, price, tags, id) {
        this.id = id; // Assign the id parameter if provided
        this.title = title;
        this.writer = writer;
        this.image = image;
        this.price = price;
        this.tags = tags;
    }
}
exports.default = Book;

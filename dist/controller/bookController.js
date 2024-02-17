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
const BookRepository_1 = __importDefault(require("../repository/BookRepository"));
const Book_1 = __importDefault(require("../entity/Book"));
class BookController {
    static getAllBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const books = yield BookRepository_1.default.getAllBooks();
                res.json(books);
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    static getBookById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const book = yield BookRepository_1.default.getBookById(id);
                if (book) {
                    res.json(book);
                }
                else {
                    res.status(404).send('Book not found');
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    static createBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, writer, image, price, tags } = req.body;
                const newBook = new Book_1.default(title, writer, image, price, tags); // Pass tags directly to the Book constructor
                yield BookRepository_1.default.createBook(newBook);
                res.status(201).send('Book created successfully');
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    static updateBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const { title, writer, image, price, tags } = req.body;
                const updatedBook = new Book_1.default(title, writer, image, price, tags);
                yield BookRepository_1.default.updateBook(id, updatedBook);
                res.status(200).send('Book updated successfully');
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
    static deleteBook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                yield BookRepository_1.default.deleteBook(id);
                res.status(200).send('Book deleted successfully');
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });
    }
}
exports.default = BookController;

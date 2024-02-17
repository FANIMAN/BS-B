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
const DatabaseService_1 = __importDefault(require("../service/DatabaseService"));
class BookRepository {
    static getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            return DatabaseService_1.default.manyOrNone('SELECT * FROM books');
        });
    }
    static getBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return DatabaseService_1.default.oneOrNone('SELECT * FROM books WHERE id = $1', [id]);
        });
    }
    static createBook(book) {
        return __awaiter(this, void 0, void 0, function* () {
            yield DatabaseService_1.default.none('INSERT INTO books(title, writer, image, price, tags) VALUES($1, $2, $3, $4, $5)', [book.title, book.writer, book.image, book.price, book.tags]);
        });
    }
    static updateBook(id, book) {
        return __awaiter(this, void 0, void 0, function* () {
            yield DatabaseService_1.default.none('UPDATE books SET title = $1, writer = $2, image = $3, price = $4, tags = $5 WHERE id = $6', [book.title, book.writer, book.image, book.price, book.tags, id]);
        });
    }
    static deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield DatabaseService_1.default.none('DELETE FROM books WHERE id = $1', [id]);
        });
    }
}
exports.default = BookRepository;

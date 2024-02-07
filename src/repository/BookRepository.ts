import db from '../service/DatabaseService';
import Book from '../entity/Book';

class BookRepository {
  static async getAllBooks(): Promise<Book[]> {
    return db.manyOrNone('SELECT * FROM books');
  }

  static async getBookById(id: number): Promise<Book | null> {
    return db.oneOrNone('SELECT * FROM books WHERE id = $1', [id]);
  }

  static async createBook(book: Book): Promise<void> {
    await db.none('INSERT INTO books(title, writer, image, price, tags) VALUES($1, $2, $3, $4, $5)', [book.title, book.writer, book.image, book.price, book.tags]);
  }

  static async updateBook(id: number, book: Book): Promise<void> {
    await db.none('UPDATE books SET title = $1, writer = $2, image = $3, price = $4, tags = $5 WHERE id = $6', [book.title, book.writer, book.image, book.price, book.tags, id]);
  }

  static async deleteBook(id: number): Promise<void> {
    await db.none('DELETE FROM books WHERE id = $1', [id]);
  }
}

export default BookRepository;

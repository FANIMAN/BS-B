import { Request, Response } from 'express';
import BookRepository from '../repository/BookRepository';
import Book from '../entity/Book';

class BookController {
  static async getAllBooks(req: Request, res: Response) {
    try {
      const books = await BookRepository.getAllBooks();
      res.json(books);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async getBookById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const book = await BookRepository.getBookById(id);
      if (book) {
        res.json(book);
      } else {
        res.status(404).send('Book not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async createBook(req: Request, res: Response) {
    try {
        const { title, writer, image, price, tags } = req.body;

        const newBook = new Book(title, writer, image, price, tags); // Pass tags directly to the Book constructor
        await BookRepository.createBook(newBook);
        res.status(201).send('Book created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}
  

  static async updateBook(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { title, writer, image, price, tags } = req.body;
      const updatedBook = new Book(title, writer, image, price, tags);
      await BookRepository.updateBook(id, updatedBook);
      res.status(200).send('Book updated successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  static async deleteBook(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      await BookRepository.deleteBook(id);
      res.status(200).send('Book deleted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }
}

export default BookController;

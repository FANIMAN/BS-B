import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import BookController from './controller/bookController';
import OrderController from './controller/orderController';
import UserController from './controller/userController'; 
import cors from 'cors'


const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors()); // Use cors middleware


// Middleware to check if user is admin
// const isAdmin = (req: Request, res: Response, next: Function) => {
//   // Assume you have authentication logic that sets user role in the request object
//   const { role } = req.user;
//   if (role === 'admin') {
//     next();
//   } else {
//     res.status(403).send('Only admin users are allowed to perform this action');
//   }
// };

// Routes for Books
app.get('/books', BookController.getAllBooks);
app.get('/books/:id', BookController.getBookById);
app.post('/books', BookController.createBook); // Only admin can create a book
app.put('/books/:id', BookController.updateBook); // Only admin can update a book
app.delete('/books/:id', BookController.deleteBook); // Only admin can delete a book



// app.post('/books', isAdmin, BookController.createBook); // Only admin can create a book
// app.put('/books/:id', isAdmin, BookController.updateBook); // Only admin can update a book
// app.delete('/books/:id', isAdmin, BookController.deleteBook); // Only admin can delete a book


// Routes for order
app.get('/orders', OrderController.getAllOrders);
app.post('/orders', OrderController.createOrder);
app.delete('/orders/:id', OrderController.cancelOrder);
app.get('/orders/:id', OrderController.getOrderById);
app.get('/orders/customer/:customer_id', OrderController.getOrdersByCustomerId); // New route




// Routes for Users
app.post('/users', UserController.createUser); // Create a new user
app.get('/users', UserController.getAllUsers); // Get all users
app.get('/users/:id', UserController.getUserById); // Get user by ID
app.put('/users/:id', UserController.updateUser); // Update user by ID
app.delete('/users/:id', UserController.deleteUser); // Delete user by ID


// Route for login
app.post('/login', UserController.login);



// Error handling middleware
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




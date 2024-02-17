"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const bookController_1 = __importDefault(require("./controller/bookController"));
const orderController_1 = __importDefault(require("./controller/orderController"));
const userController_1 = __importDefault(require("./controller/userController"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 4000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)()); // Use cors middleware
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
app.get('/books', bookController_1.default.getAllBooks);
app.get('/books/:id', bookController_1.default.getBookById);
app.post('/books', bookController_1.default.createBook); // Only admin can create a book
app.put('/books/:id', bookController_1.default.updateBook); // Only admin can update a book
app.delete('/books/:id', bookController_1.default.deleteBook); // Only admin can delete a book
// app.post('/books', isAdmin, BookController.createBook); // Only admin can create a book
// app.put('/books/:id', isAdmin, BookController.updateBook); // Only admin can update a book
// app.delete('/books/:id', isAdmin, BookController.deleteBook); // Only admin can delete a book
// Routes for order
app.get('/orders', orderController_1.default.getAllOrders);
app.post('/orders', orderController_1.default.createOrder);
app.delete('/orders/:id', orderController_1.default.cancelOrder);
app.get('/orders/:id', orderController_1.default.getOrderById);
app.get('/orders/customer/:customer_id', orderController_1.default.getOrdersByCustomerId); // New route
// Routes for Users
app.post('/users', userController_1.default.createUser); // Create a new user
app.get('/users', userController_1.default.getAllUsers); // Get all users
app.get('/users/:id', userController_1.default.getUserById); // Get user by ID
app.put('/users/:id', userController_1.default.updateUser); // Update user by ID
app.delete('/users/:id', userController_1.default.deleteUser); // Delete user by ID
// Route for login
app.post('/login', userController_1.default.login);
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

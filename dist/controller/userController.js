"use strict";
// src/controller/userController.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRepository_1 = __importDefault(require("../repository/UserRepository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    // static async createUser(req: Request, res: Response) {
    //   try {
    //     const { name, email, role, points, password } = req.body;
    //     const newUser = await UserRepository.createUser(name, email, role, points, password);
    //     res.status(201).json(newUser);
    //   } catch (error) {
    //     console.error('Error creating user:', error);
    //     res.status(500).json({ message: 'Error creating user' });
    //   }
    // }
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, role, password } = req.body; // Remove 'points' from here
                // const newUser = await UserRepository.createUser(name, email, role, password); // Remove 'points' from here
                // Hash the password
                const hashedPassword = yield bcrypt_1.default.hash(password, 10); // 10 is the saltRounds
                // Create the user with the hashed password
                const newUser = yield UserRepository_1.default.createUser(name, email, role, hashedPassword);
                res.status(201).json(newUser);
            }
            catch (error) {
                console.error('Error creating user:', error);
                res.status(500).json({ message: 'Error creating user' });
            }
        });
    }
    static getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserRepository_1.default.getAllUsers();
                res.status(200).json(users);
            }
            catch (error) {
                console.error('Error getting users:', error);
                res.status(500).json({ message: 'Error getting users' });
            }
        });
    }
    static getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id);
                const user = yield UserRepository_1.default.getUserById(userId);
                if (user) {
                    res.status(200).json(user);
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            catch (error) {
                console.error('Error getting user by ID:', error);
                res.status(500).json({ message: 'Error getting user by ID' });
            }
        });
    }
    static updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id);
                const { name, email, role, points, password } = req.body;
                // Remove the password field from the updateFields object if it's not provided or empty in the request body
                const updateFields = { name, email, role, points };
                if (password !== undefined && password !== '') {
                    updateFields.password = password;
                }
                const updatedUser = yield UserRepository_1.default.updateUser(userId, updateFields);
                if (updatedUser) {
                    res.status(200).json(updatedUser);
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            catch (error) {
                console.error('Error updating user:', error);
                res.status(500).json({ message: 'Error updating user' });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.params.id);
                const deletedUser = yield UserRepository_1.default.deleteUser(userId);
                if (deletedUser) {
                    res.status(200).json({ message: 'User deleted successfully' });
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            catch (error) {
                console.error('Error deleting user:', error);
                res.status(500).json({ message: 'Error deleting user' });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            console.log(email);
            console.log(password);
            try {
                // Find user by email
                const user = yield UserRepository_1.default.findByEmail(email);
                console.log(user);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                // Compare passwords
                const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
                if (!isValidPassword) {
                    return res.status(401).json({ message: 'Invalid password' });
                }
                // Remove password from user object
                const { password: userPassword } = user, userData = __rest(user, ["password"]);
                // Generate JWT token
                const token = jsonwebtoken_1.default.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '24h' });
                res.status(200).json({ user: userData, token });
            }
            catch (error) {
                console.error('Error logging in:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.default = UserController;

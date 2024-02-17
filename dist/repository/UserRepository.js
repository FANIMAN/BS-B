"use strict";
// src/repository/UserRepository.ts
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
class UserRepository {
    // static async createUser(name: string, email: string, role: string, points: number, password: string): Promise<User> {
    //   const newUser = await db.one(
    //     'INSERT INTO users (name, email, role, points, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    //     [name, email, role, points, password]
    //   );
    //   return newUser;
    // }
    static createUser(name, email, role, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let points = 0;
            if (role === 'customer') {
                points = 100;
            }
            const newUser = yield DatabaseService_1.default.one('INSERT INTO users (name, email, role, points, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, email, role, points, password]);
            return newUser;
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield DatabaseService_1.default.manyOrNone('SELECT * FROM users');
            return users;
        });
    }
    static getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield DatabaseService_1.default.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);
            return user;
        });
    }
    // static async updateUser(id: number, updateFields: any): Promise<User | null> {
    //   const { name, email, role, points, password } = updateFields;
    //   const updatedUser = await db.oneOrNone(
    //     'UPDATE users SET name = $2, email = $3, role = $4, points = $5, password = $6 WHERE id = $1 RETURNING *',
    //     [id, name, email, role, points, password]
    //   );
    //   return updatedUser;
    // }
    static updateUser(id, updateFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, role, points, password } = updateFields;
            // Construct the SET clause dynamically based on the provided fields
            const setClause = [];
            const values = [id];
            let index = 2; // Start index for parameterized values
            if (name !== undefined) {
                setClause.push(`name = $${index}`);
                values.push(name);
                index++;
            }
            if (email !== undefined) {
                setClause.push(`email = $${index}`);
                values.push(email);
                index++;
            }
            if (role !== undefined) {
                setClause.push(`role = $${index}`);
                values.push(role);
                index++;
            }
            if (points !== undefined) {
                setClause.push(`points = $${index}`);
                values.push(points);
                index++;
            }
            if (password !== undefined && password !== '') {
                setClause.push(`password = $${index}`);
                values.push(password);
                index++;
            }
            // Construct the SQL query with the SET clause
            const query = `UPDATE users SET ${setClause.join(', ')} WHERE id = $1 RETURNING *`;
            const updatedUser = yield DatabaseService_1.default.oneOrNone(query, values);
            return updatedUser;
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield DatabaseService_1.default.result('DELETE FROM users WHERE id = $1', [id], (r) => r.rowCount);
            return result === 1;
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield DatabaseService_1.default.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
                return user;
            }
            catch (error) {
                console.error('Error finding user by email:', error);
                throw new Error('Failed to find user by email');
            }
        });
    }
}
exports.default = UserRepository;

// src/repository/UserRepository.ts

import db from '../service/DatabaseService';
import User from '../entity/User';

class UserRepository {
  // static async createUser(name: string, email: string, role: string, points: number, password: string): Promise<User> {
  //   const newUser = await db.one(
  //     'INSERT INTO users (name, email, role, points, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
  //     [name, email, role, points, password]
  //   );
  //   return newUser;
  // }

  static async createUser(name: string, email: string, role: string, password: string): Promise<User> {
    let points = 0;
    if (role === 'customer') {
      points = 100;
    }

    const newUser = await db.one(
      'INSERT INTO users (name, email, role, points, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, role, points, password]
    );
    return newUser;
  }


  static async getAllUsers(): Promise<User[]> {
    const users = await db.manyOrNone('SELECT * FROM users');
    return users;
  }

  static async getUserById(id: number): Promise<User | null> {
    const user = await db.oneOrNone('SELECT * FROM users WHERE id = $1', [id]);
    return user;
  }

  // static async updateUser(id: number, updateFields: any): Promise<User | null> {
  //   const { name, email, role, points, password } = updateFields;
  //   const updatedUser = await db.oneOrNone(
  //     'UPDATE users SET name = $2, email = $3, role = $4, points = $5, password = $6 WHERE id = $1 RETURNING *',
  //     [id, name, email, role, points, password]
  //   );
  //   return updatedUser;
  // }


  static async updateUser(id: number, updateFields: any): Promise<User | null> {
    const { name, email, role, points, password } = updateFields;
  
    // Construct the SET clause dynamically based on the provided fields
    const setClause: string[] = [];
    const values: any[] = [id];
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
  
    const updatedUser = await db.oneOrNone(query, values);
    return updatedUser;
  }

  

  static async deleteUser(id: number): Promise<boolean> {
    const result = await db.result('DELETE FROM users WHERE id = $1', [id], (r) => r.rowCount);
    return result === 1;
  }


  static async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
      return user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Failed to find user by email');
    }
  }
}

export default UserRepository;

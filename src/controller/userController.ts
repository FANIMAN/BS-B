// src/controller/userController.ts

import { Request, Response } from 'express';
import UserRepository from '../repository/UserRepository';
import User from '../entity/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


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


  static async createUser(req: Request, res: Response) {
  try {
    const { name, email, role, password } = req.body; // Remove 'points' from here
    // const newUser = await UserRepository.createUser(name, email, role, password); // Remove 'points' from here
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    // Create the user with the hashed password
    const newUser = await UserRepository.createUser(name, email, role, hashedPassword);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
}

  static async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserRepository.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error('Error getting users:', error);
      res.status(500).json({ message: 'Error getting users' });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const user = await UserRepository.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error getting user by ID:', error);
      res.status(500).json({ message: 'Error getting user by ID' });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const { name, email, role, points, password } = req.body;
  
      // Remove the password field from the updateFields object if it's not provided or empty in the request body
      const updateFields: any = { name, email, role, points };
      if (password !== undefined && password !== '') {
        updateFields.password = password;
      }
  
      const updatedUser = await UserRepository.updateUser(userId, updateFields);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Error updating user' });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const userId = parseInt(req.params.id);
      const deletedUser = await UserRepository.deleteUser(userId);
      if (deletedUser) {
        res.status(200).json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Error deleting user' });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)


    try {
      // Find user by email
      const user = await UserRepository.findByEmail(email);
      console.log(user)

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Compare passwords
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Remove password from user object
      const { password: userPassword, ...userData } = user;

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '24h' });

      res.status(200).json({ user: userData, token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default UserController;

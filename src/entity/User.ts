// src/entity/User.ts

export default class User {
    id: number;
    name: string;
    email: string;
    role: string;
    points: number;
    password: string;
  
    constructor(id: number, name: string, email: string, role: string, points: number, password: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.role = role;
      this.points = points;
      this.password = password;
    }
  }
  
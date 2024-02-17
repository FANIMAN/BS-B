"use strict";
// src/entity/User.ts
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(id, name, email, role, points, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.points = points;
        this.password = password;
    }
}
exports.default = User;

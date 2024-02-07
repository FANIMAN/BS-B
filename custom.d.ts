// custom.d.ts

// declare module 'express-serve-static-core' {
//     interface Request {
//       user?: {
//         // Define the properties of your user object here
//         role: string;
//         // Add other properties as needed
//       };
//     }
//   }
declare namespace Express {
    export interface Request {
        user: any;
    }
    export interface Response {
        user: any;
    }
  }
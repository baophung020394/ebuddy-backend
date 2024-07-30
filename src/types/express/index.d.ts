import * as express from "express";
import { User } from "../../models/user.model";

export type Dict = { [key: string]: any };

export interface RequestWithUser extends Request {
  user: any;
}

// declare module "express-serve-static-core" {
//   interface Request {
//     objKey?: any;
//     keyStore?: KeyToken;
//     user?: any;
//   }
// }

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      uid: string;
      [key: string]: any;
    };
  }
}

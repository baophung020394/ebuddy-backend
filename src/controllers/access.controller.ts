import { NextFunction, Request, Response } from "express";
import { CREATED, SuccessResponse } from "../entities/success.response";
import { logoutFirebase } from "../repository/userCollection";
import {
  createUser,
  fetchUser,
  getUser,
  updateUser,
} from "../services/access.service";

class UserController {
  public createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const userData = req.body;
    const newUser = await createUser(userData);

    new CREATED({
      message: "User created successfully",
      metadata: newUser,
    }).send(res);
  };

  public updateUserData = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { userId, name } = req.body;
    const updatedUser = await updateUser(userId, name);

    new SuccessResponse({
      message: "User data updated successfully",
      metadata: updatedUser,
    }).send(res);
  };

  public fetchUserData = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const user = await fetchUser();
    new SuccessResponse({
      message: "User data fetched successfully",
      metadata: user,
    }).send(res);
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const userId = (req?.user as any)?.uid;
    const userlogout = await logoutFirebase(userId);

    new SuccessResponse({
      message: "User logout successfully",
    }).send(res);
  };

  public getUser = async (req: Request, res: Response, next: NextFunction) => {
    // @ts-ignore
    const accessToken = (req?.user as any)?.accessToken;
    // console.log("(req?.user as any)", accessToken);
    const user = await getUser(accessToken);
    // console.log("user,", user);
    new SuccessResponse({
      message: "User auth successfully",
      metadata: user,
    }).send(res);
  };
}

export default new UserController();

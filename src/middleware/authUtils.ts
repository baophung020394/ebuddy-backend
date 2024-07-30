import { NextFunction, Request, Response } from "express";

import { admin } from "../configs/config.firebase";
import { AuthFailureError } from "../entities/error.response";
import { asyncHandler } from "../helpers/asyncHandler";

const HEADER = {
  AUTHORIZATION: "authorization",
};

const authentication = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // 2. Lấy accessToken từ header
    const accessToken = req.headers[HEADER.AUTHORIZATION]?.toString();
    if (!accessToken) throw new AuthFailureError("Invalid Request");

    try {
      const decodedToken = await admin.auth().verifyIdToken(accessToken);

      // @ts-ignore
      req.user = { ...decodedToken, accessToken };
      // console.log("decodedToken", decodedToken);
      return next();
    } catch (error) {
      console.error("Authentication error:", error);
      throw new AuthFailureError("Unauthorized");
    }
  },
);

export { authentication };

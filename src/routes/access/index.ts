import express from "express";

import accessController from "../../controllers/access.controller";
import { asyncHandler } from "../../helpers/asyncHandler";
import { authentication } from "../../middleware/authUtils";

const router = express.Router();

// check auth
router.use(authentication);
router.post("/user/logout", asyncHandler(accessController.logout));
router.get("/user/me", asyncHandler(accessController.getUser));
router.get("/users", asyncHandler(accessController.fetchUserData));
router.post("/user", asyncHandler(accessController.createUser));
router.put("/user/update", asyncHandler(accessController.updateUserData));

export default router;

import express from "express";
import accessRoutes from "./access";

const router = express.Router();

router.get("/", (req, res) => {
  return res.send({
    message: "Server is running",
  });
});

// router.post("/create", createApiKeyController);

// check apiKey
// router.use(apiKey);

router.use("/v1/api", accessRoutes);

export default router;

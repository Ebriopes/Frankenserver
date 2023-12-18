import { Router } from "express";
import { AuthController } from "../controllers";

const router = Router();

router.get("/", (_, res) => {
  res
    .status(200)
    .send("Oh do you want enter, eh? Try with a POST method instead.");
});

router.post("/", AuthController.login);

// router.post("/", loginController.createUser);

export default router;

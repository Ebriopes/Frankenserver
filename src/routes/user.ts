import { Router } from "express";
import userController from "../controllers/UserController";

const router = Router();

// router.get("/", (_, res) => {
//   return res.status(200).send("Why you do want an USER?? ? ??");
// });

router.get("/", userController.listAll);
router.post("/create", userController.newUser);

// TODO: create a user

export default router;

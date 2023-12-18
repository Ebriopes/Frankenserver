import { Router } from "express";

import publicRoute from "./public";
import loginRoute from "./login";
import userRoute from "./user";
import { checkRoles, verifyJwt } from "../middlewares";
import { AuthController } from "../controllers";

const router = Router();

router.use(publicRoute);

router.get("/", (_, res) => {
  // const welcomeHTML = path.join(__dirname, "../../public", "Hello.html");
  // router.use(static_(welcomeHTML));
  res.status(200).send("What are you looking for?");
  // res.sendFile(welcomeHTML);
});

router.use("/login", loginRoute);
router.use("/token/refresh", AuthController.refreshToken);

router.use("", verifyJwt, checkRoles);
router.use("/users", userRoute);
// TODO When we complete users, we need continue with the "recibos"

export default router;

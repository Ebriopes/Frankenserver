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

router.use("", verifyJwt);
router.use("/users", userRoute);

router.use("", checkRoles);

export default router;

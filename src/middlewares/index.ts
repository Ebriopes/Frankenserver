import { Router } from "express";
// import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import bp from "body-parser";
import { COOKIE_SECRET } from "../config";

const { json, urlencoded } = bp;

export * from "./checkRoles";
export * from "./verifyJwt";

const router = Router();

// parse application/x-www-form-urlencoded
router.use(urlencoded({ extended: false }));
// parse application/json
router.use(json());
// router.use(helmet());
router.use(cors());
router.use(cookieParser(COOKIE_SECRET));

export default router;

import { Router, static as static_ } from "express";
import serveIndex from "serve-index";

const router = Router();

router.use("/public", static_("public"));
router.use("/public", serveIndex("public"));

export default router;

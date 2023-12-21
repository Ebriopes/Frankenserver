import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import { createRequire } from "module";
// import { readFile } from "fs/promises";

// const swaggerDocument = JSON.parse(
//   await readFile(new URL("../docs/openapi.json", import.meta.url))
// );

const router = Router();

router.use("/api-docs", serve, setup(swaggerDocument));

export default router;

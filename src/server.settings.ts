import express from "express";
/** Import custom modules */
import routes from "./routes";
import middlewares from "./middlewares";

const app = express();

app.use(middlewares);
app.use(routes);

export default app;

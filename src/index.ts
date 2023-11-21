/** Import node modules */
import express from "express";

/** Import custom modules */
import { PORT } from "./config";
import { AppDataSource } from "./database";
import routes from "./routes";
import middlewares from "./middlewares";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(middlewares);
    app.use(routes);

    app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
  })
  .catch((error) => console.log(error));

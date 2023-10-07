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

    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // user.firstName = "Timber";
    // user.lastName = "Saw";
    // user.age = 25;
    // await AppDataSource.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await AppDataSource.manager.find(User);
    // console.log("Loaded users: ", users);
    app.use(middlewares);
    app.use(routes);

    app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
  })
  .catch((error) => console.log(error));

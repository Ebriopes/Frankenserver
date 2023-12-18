import { PORT } from "./config";
import { AppDataSource } from "./database";
import app from "./server.settings";

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => console.log(`Server listening in port ${PORT}`));
  })
  .catch((error) => console.log(error));

// export default app;

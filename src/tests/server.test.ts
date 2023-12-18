import request from "supertest";
import app from "../server.settings";
import { AppDataSource } from "../database";

/* Connecting to the database before each test. */
beforeEach(async () => {
  await AppDataSource.initialize();
});

/* Closing database connection after each test. */
afterEach(async () => {
  await AppDataSource.destroy();
});

describe("Server on", () => {
  it("Get success response at the root /", async () => {
    await request(app).get("/").expect(200);
  });
});

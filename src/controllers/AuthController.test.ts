import request from "supertest";
import { TestHelper } from "../tests/db-helper";
import AuthController from "./AuthController";
import app from "../server.settings";

describe("Auth controller: authentication methods to manage access", () => {
  beforeAll(async () => {
    await TestHelper.instance.setupTestDB();
  });

  // afterAll(async () => {
  //   await TestHelper.instance.teardownTestDB();
  // });

  it("Login", () => {});
});

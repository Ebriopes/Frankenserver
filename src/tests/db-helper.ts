import { DataSource } from "typeorm";
import Database from "better-sqlite3";

export class TestHelper {
  private static _instance: TestHelper;

  private constructor() {}

  public static get instance(): TestHelper {
    if (!this._instance) this._instance = new TestHelper();

    return this._instance;
  }

  private dbConnect!: DataSource;
  private testDB!: any;

  async setupTestDB() {
    this.testDB = new Database(":memory:", { verbose: console.log });

    this.dbConnect = new DataSource({
      name: "frankenstein",
      type: "better-sqlite3",
      database: ":memory:",
      entities: ["../src/entity/*.ts"],
      synchronize: true,
    });
  }

  teardownTestDB() {
    this.dbConnect.destroy();
    this.testDB.close();
  }
}

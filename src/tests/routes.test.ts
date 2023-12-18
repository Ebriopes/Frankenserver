import request from "supertest";
import app from "../server.settings";

describe("Routes: Main routes", () => {
  it("GET /", async () => {
    await request(app)
      .get("/")
      .expect("Content-Type", /text\/html/)
      .expect("Content-Length", "25")
      .expect(200);
  });
  // it("GET /public", async () => {
  //   await request(app)
  //     .get("/public")
  //     .expect(200);
  // });
  describe("Login: /login", () => {
    it("GET /", async () => {
      await request(app)
        .get("/login")
        .expect("Content-Type", /text\/html/)
        .expect(200);
    });
    // it("POST /", async () => {
    //   await request(app)
    //     .post("/login")
    // .send()
    // .expect(200);
    // });
  });
});

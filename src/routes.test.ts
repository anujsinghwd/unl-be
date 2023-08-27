import request from "supertest";
import { Server } from "./server";

describe("Root Route", () => {
  let server: Server;

  beforeAll(async () => {
    server = new Server();
    const port = 10;
    server.start(port);
  });

  afterAll(async () => {
    await server.stop();
  });

  it("should respond with 'Hello, Express!'", async () => {
    const app = server.getApp();
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, Express!");
  });

  it("should respond with search results", async () => {
    const response = await request(server.getApp())
      .get("/search")
      .query({ text: "New" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(10);

    expect(response.body[0]).toHaveProperty("city");
    expect(response.body[0]).toHaveProperty("country");
  });

  it("should respond with 0 search results", async () => {
    const response = await request(server.getApp())
      .get("/search")
      .query({ text: "123Test" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
});

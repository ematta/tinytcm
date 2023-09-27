import { describe, expect, it } from "bun:test";
import { app }  from "../src/index";

describe("Ping", () => {
  it("return a response", async () => {
    const response = await app
      .handle(new Request("http://localhost/ping"))
      .then((res) => res.text());

    expect(response).toBe("pong");
  });
});

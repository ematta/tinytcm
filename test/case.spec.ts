import { describe, expect, it, jest } from "bun:test";

import { app } from "../src/index";

describe("Testcase", () => {
  it("return a response", async () => {
    const tcBody = {
      title: "TC 1",
      content: "Test Case 1",
      userId: 1,
    };

    const tcUpdated = {
      content: "Test Case 1 update",
    };

    const postRequest = new Request("http://localhost/case", {
      method: "POST",
      body: JSON.stringify(tcBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const post = await app.handle(postRequest).then((res) => res);
    const postJson = await post.json();
    expect(post.status).toBe(200);
    expect(postJson.content).toBe(tcBody.content);
    expect(postJson.title).toBe(tcBody.title);

    const getRequest = new Request(
      `http://localhost/case/${postJson.id}`,
      {
        method: "GET",
      }
    );
    const get = await app.handle(getRequest).then((res) => res);
    const getResponse = await get.json();
    expect(get.status).toBe(200);
    expect(getResponse.content).toBe(tcBody.content);
    expect(getResponse.title).toBe(tcBody.title);

    const putRequest = new Request(
      `http://localhost/case/${postJson.id}`,
      {
        method: "PUT",
        body: JSON.stringify(tcUpdated),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const put = await app.handle(putRequest).then((res) => res);
    const putJson = await put.json();
    expect(put.status).toBe(200);
    expect(putJson.content).toBe(tcUpdated.content);
    expect(putJson.title).toBe(tcBody.title);

    const deleteRequest = new Request(
      `http://localhost/case/${postJson.id}`,
      {
        method: "PUT",
        body: JSON.stringify(tcUpdated),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const deleted = await app.handle(deleteRequest).then((res) => res);
    expect(deleted.status).toBe(200);
  });
});

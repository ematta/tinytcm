import { describe, expect, it } from "bun:test";
import { app } from "../src/index";

describe("Testcase", () => {
  it("return a response", async () => {
    const tcBody = {
      title: "TC 1",
      content: "Test Case 1",
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
    expect(postJson.data.uuid).not.toBeNull();

    const getRequest = new Request(
      `http://localhost/case/${postJson.data.uuid}`,
      {
        method: "GET",
      }
    );
    const get = await app.handle(getRequest).then((res) => res);
    const getResponse = await get.json();
    expect(get.status).toBe(200);
    expect(getResponse.message).toBe("Test case retrieved successfully");
    expect(getResponse.data.title).toBe(tcBody.title);
    expect(getResponse.data.content).toBe(tcBody.content);

    // const putRequest = new Request(
    //   `http://localhost/case/${postJson.data.uuid}`,
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(tcUpdated),
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const put = await app.handle(putRequest).then((res) => res.json());
    // const putJson = await put.json();
    // expect(put.status).toBe(200);
    // expect(putJson.data.uuid).not.toBeNull();
    // expect(putJson.message).toBe("Test case updated successfully");
  });
});

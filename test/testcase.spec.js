import { describe, expect, it } from "bun:test";
import { app } from "../src/index";

describe("Testcase", () => {
  it("return a response", async () => {
    const tcBody = {
      name: "TC 1",
      text: "Test Case 1",
    };

    const tcUpdated = {
      text: "Test Case 1 update",
    };

    const postRequest = new Request("http://localhost/testcase", {
      method: "POST",
      body: JSON.stringify(tcBody),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const postResponse = await app
      .handle(postRequest)
      .then((res) => res.json());

    expect(postResponse.message).toBe("Test case created successfully");
    expect(postResponse.data.id).not.toBeNull();

    const getRequest = new Request(
      `http://localhost/testcase/${postResponse.data.id}`,
      {
        method: "GET",
      }
    );

    const getResponse = await app.handle(getRequest).then((res) => res.json());

    expect(getResponse.message).toBe("Test case retrieved successfully");
    expect(getResponse.data.testcase).toMatchObject(tcBody);

    const putRequest = new Request(
      `http://localhost/testcase/${postResponse.data.id}`,
      {
        method: "PUT",
        body: JSON.stringify(tcUpdated),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const putResponse = await app.handle(putRequest).then((res) => res.json());

    expect(putResponse.data.id).not.toBeNull();
    expect(putResponse.message).toBe("Test case updated successfully");

    // const getRequestAgain = new Request(
    //   `http://localhost/testcase/${postResponse.id}`,
    //   {
    //     method: "GET",
    //   }
    // );

    // const getResponseAgain = await app
    //   .handle(getRequestAgain)
    //   .then((res) => res.json());

    // expect(getResponseAgain.message).toBe("Test case retrieved successfully");
    // expect(getResgetResponseAgainponse.data).not.toMatchObject(tcBody);
  });
});

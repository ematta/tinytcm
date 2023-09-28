import { describe, expect, it } from "bun:test";
import { app } from "../src/index";

// describe("User", () => {
//   it("return a response", async () => {
//     const response = await app
//       .handle(
//         new Request("http://localhost/user/sign-up", {
//           method: "POST",
//           body: { 
//             name: "Enrique Matta", 
//             email: "enrique@matta.dev",
//             password: "test" 
//           },
//         })
//       )
//       .then((res) => res.json());

//       expect(response.message).toBe("Sign up successfully");
//   });
// });

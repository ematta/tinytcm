import { Elysia, NotFoundError } from "elysia";
import { signIn, signUp, signOut } from "./handler/user/index";
import { getTest, deleteTest, postTest, putTest } from "./handler/testcase/index";

const config = require("config");

export const app = new Elysia()
  .onRequest(() => {
    // console.log("On request");
  })
  .onBeforeHandle(() => {
    // console.log("Before handle");
  })
  .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      return new NotFoundError(error.toString());
    }
    return new Response(error.toString());
  })
  .get("/ping", () => "pong")
  .group("/user", (app) =>
    app
      .post("/sign-in", signIn)
      .post("/sign-up", signUp)
      .get("/sign-out", signOut)
  )
  .group("/testcase", (app) =>
    app
      .post("/", postTest)
      .put("/:id", putTest)
      .get("/:id", getTest)
      .delete("/:id", deleteTest)
  )
  .listen(config.app.port ?? 3000);

console.log(`Server is listening on port ${config.app.port}`);

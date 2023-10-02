import prisma from "../src/client";

await prisma.user.create({
  data: {
    email: "enrique@matta.dev",
    name: "Enrique",
  },
});
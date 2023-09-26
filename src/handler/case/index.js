import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTest = async ({ params }) => {
  const { uuid } = params;

  const caseFound = await prisma.case.findUnique({
    where: {
      uuid,
    },
  });

  return {
    message: "Test case retrieved successfully",
    data: {
      ...caseFound,
    },
  };
};
export const deleteTest = ({ params }) => params.id;

export const postTest = async ({ body }) => {
  const uuid = crypto.randomUUID();
  await prisma.case.create({
    data: {
      ...body,
      uuid,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  return {
    data: {
      uuid: uuid,
    }
  };
};
export const putTest = ({ body, params }) => {
  for (const [key, value] of Object.entries(body)) {
    TC[params.id][key] = value;
  }
  return {
    message: "Test case updated successfully",
    data: {
      id: params.id,
    }
  };
};
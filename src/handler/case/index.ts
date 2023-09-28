import crypto from "crypto";
import prisma from "../../client";

export const getTest = async ({ params }) => {
  const { uuid } = params;

  const caseFound = await prisma.case.findUnique({
    where: {
      uuid,
    },
  });

  return {
    ...caseFound
  };
};
export const deleteTest = ({ params }) => {
  const { uuid } = params;

  return prisma.case.delete({
    where: {
      uuid,
    },
  });
};

export const postTest = async ({ body }) => {
  return prisma.case.create({
    data: {
      ...body,
      uuid: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
};
export const putTest = ({ body, params }) => {
  const { uuid } = params;

  return prisma.case.update({
    where: {
      uuid,
    },
    data: {
      ...body,
      updatedAt: new Date(),
    },
  });
};
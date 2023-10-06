import crypto from "crypto";
import prisma from "../../client";

export const getTest = async ({ params }) => {
  const { id } = params;
  const caseFound = await prisma.case.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return {
    ...caseFound
  };
};
export const deleteTest = ({ params }) => {
  const { id } = params;

  return prisma.case.delete({
    where: {
      id: parseInt(id),
    },
  });
};

export const postTest = async ({ body }) => {
  return prisma.case.create({
    data: {
      ...body
    },
  });
};
export const putTest = ({ body, params }) => {
  const { id } = params;

  return prisma.case.update({
    where: {
      id: parseInt(id),
    },
    data: {
      ...body,
      updatedAt: new Date(),
    },
  });
};
import crypto from "crypto";

const TC = {};
    

export const getTest = ({ params }) => {
  const { id } = params;
  const testcase = TC[id];
  return {
    message: "Test case retrieved successfully",
    data: {
      id,
      testcase,
    },
  };
};
export const deleteTest = ({ params }) => params.id;

export const postTest = ({ body }) => {
  const id = crypto.randomUUID();
  TC[id] = body;
  return {
    message: "Test case created successfully",
    data: {
      id: id,
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
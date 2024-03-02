import { cleanup } from "@testing-library/react";

export default {
  get: jest.fn().mockResolvedValue({ data: {} }),
};

afterEach(cleanup);

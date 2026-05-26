import { jest } from "@jest/globals";
const mockFindOne = jest.fn();
const mockCreate = jest.fn();

jest.unstable_mockModule("../profile-model/user.js", () => ({
  User: {
    findOne: mockFindOne,
    create: mockCreate,
  },
}));

const { registerUser } = await import("../Profile-verification/user.js");

describe("registerUser unit tests", () => {
  test("returns 400 if username is missing", async () => {
    const req = { body: { email: "test@test.com", password: "12345678" } };
    let statusCode;
    const res = {
      status: (code) => {
        statusCode = code;
        return { json: () => {} };
      },
    };
    await registerUser(req, res);
    expect(statusCode).toBe(400);
  });

  test("returns 400 if email is missing", async () => {
    const req = { body: { username: "testuser", password: "12345678" } };
    let statusCode;
    const res = {
      status: (code) => {
        statusCode = code;
        return { json: () => {} };
      },
    };
    await registerUser(req, res);
    expect(statusCode).toBe(400);
  });

  test("returns 400 if password is missing", async () => {
    const req = { body: { username: "testuser", email: "test@test.com" } };
    let statusCode;
    const res = {
      status: (code) => {
        statusCode = code;
        return { json: () => {} };
      },
    };
    await registerUser(req, res);
    expect(statusCode).toBe(400);
  });

  test("returns 400 if email already exists", async () => {
    mockFindOne.mockResolvedValue({ email: "test@test.com" });
    const req = {
      body: {
        username: "testuser",
        email: "test@test.com",
        password: "12345678",
      },
    };
    let statusCode;
    const res = {
      status: (code) => {
        statusCode = code;
        return { json: () => {} };
      },
    };
    await registerUser(req, res);
    expect(statusCode).toBe(400);
  });
});
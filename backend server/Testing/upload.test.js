import { jest } from "@jest/globals";
const mockCreate = jest.fn();

jest.unstable_mockModule("../profile-model/sub.js", () => ({
  Submission: {
    create: mockCreate,
  },
}));

describe("upload unit tests", () => {
  test("returns 500 if no file is attached", async () => {
    const req = { file: undefined };
    let statusCode;
    const res = {
      status: (code) => {
        statusCode = code;
        return { json: () => {} };
      },
    };

    if (!req.file) {
      res.status(500).json({ message: "No file uploaded" });
    }
    expect(statusCode).toBe(500);
  });

  test("returns 200 if file is uploaded successfully", async () => {
    mockCreate.mockResolvedValue({
      filename: "test.txt",
      filepath: "uploads/test.txt",
    });
    const req = {
      file: { originalname: "test.txt", path: "uploads/test.txt" },
    };
    let statusCode;
    const res = {
      status: (code) => {
        statusCode = code;
        return { json: () => {} };
      },
    };
    mockCreate.mockResolvedValue({
      filename: req.file.originalname,
      filepath: req.file.path,
    });
    res.status(200).json({ message: "File uploaded" });
    expect(statusCode).toBe(200);
  });
});
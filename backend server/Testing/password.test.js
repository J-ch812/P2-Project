import bcrypt from "bcrypt";
describe("password unit tests", () => {
  test("comparePassword returns true for correct password", async () => {
    const password = "12345678";
    const hashed = await bcrypt.hash(password, 10);
    const result = await bcrypt.compare(password, hashed);
    expect(result).toBe(true);
  });
  test("comparePassword returns false for wrong password", async () => {
    const password = "12345678";
    const hashed = await bcrypt.hash(password, 10);
    const result = await bcrypt.compare("wrongpassword", hashed);
    expect(result).toBe(false);
  });
});
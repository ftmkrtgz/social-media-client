import { login } from "./login.js";
import { apiPath } from "../constants.js";
import { headers } from "../headers.js";

// Mock the fetch function
global.fetch = jest.fn();

// Mock the localStorage object
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

describe("login function", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should set the token with a successful login", async () => {
    const mockAccessToken = "mockToken";
    const mockProfile = { name: "Test User", accessToken: mockAccessToken };
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockProfile),
    };

    global.fetch.mockResolvedValueOnce(mockResponse);

    // Call the login function
    const result = await login("test@example.com", "password");

    // Assertions
    expect(global.fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
      method: "post",
      body: JSON.stringify({ email: "test@example.com", password: "password" }),
      headers: headers("application/json"),
    });

    expect(result).toEqual(mockProfile);
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      "token",
      JSON.stringify(mockAccessToken),
    );
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      "profile",
      JSON.stringify({ name: "Test User" }),
    );
  });

  it("should return the user name with successful login", async () => {
    const mockResponse = { ok: false, statusText: "Unauthorized" };

    global.fetch.mockResolvedValueOnce(mockResponse);

    // Call the login function
    await expect(
      login("invalid@example.com", "wrongpassword"),
    ).rejects.toThrowError("Unauthorized");

    // Assertions
    expect(global.fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
      method: "post",
      body: JSON.stringify({
        email: "invalid@example.com",
        password: "wrongpassword",
      }),
      headers: headers("application/json"),
    });
  });
});

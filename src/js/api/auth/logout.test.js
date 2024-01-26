import { logout } from "./logout.js";
import * as storageModule from "../../storage/index";

// Mock the remove function from the storage module
jest.mock("../../storage/index", () => ({
  remove: jest.fn(),
}));

describe("logout", () => {
  it('should call remove with "token" and "profile"', () => {
    // Call the logout function
    logout();

    // Expect the remove function to be called with specific arguments
    expect(storageModule.remove).toHaveBeenCalledWith("token");
    expect(storageModule.remove).toHaveBeenCalledWith("profile");

    // Alternatively, you can use a snapshot test to check the entire mock object
    expect(storageModule.remove).toMatchSnapshot();
  });
});

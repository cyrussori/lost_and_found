/*import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "../src/pages/Profile";
import { vi } from "vitest";
import { act } from "react";

vi.mock("axios");

import axios from "axios";

describe("Profile page", () => {
  const mockUser = { name: "Josie Bruin", email: "josieBruin@ucla.edu" };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockUser });
  });

  // Test 1: shows loading on mount
  it("shows loading message while fetching user info", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  // Test 2: renders user full name and email after fetch
  it("renders user full name and email after fetch", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    const name = await screen.findByText(mockUser.name);
    const email = await screen.findByText(mockUser.email);
    const editBtn = screen.getByText(/edit profile/i);

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(editBtn).toBeInTheDocument();
  });
});
*/

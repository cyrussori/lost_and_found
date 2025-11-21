import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "../src/pages/Profile";
import { vi } from "vitest";
import { act } from "react";

vi.mock("axios", () => {
  return {
    default: {
      get: vi.fn(),
    },
  };
});

import axios from "axios";

// Test 1: shows loading on mount
test("shows loading message while fetching user info", () => {
  axios.get.mockResolvedValueOnce({
    data: {
      name: "Josie Bruin",
      email: "josieBruin@ucla.edu",
    },
  });
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );
  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

// Test 2: renders user full name and email after fetch
test("renders user full name and email after fetch", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      name: "Josie Bruin",
      email: "josieBruin@ucla.edu",
    },
  });
  await act(async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
  });

  expect(await screen.findByText("Josie Bruin")).toBeInTheDocument();
  expect(await screen.findByText("josieBruin@ucla.edu")).toBeInTheDocument();
});

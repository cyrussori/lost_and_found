// Test 1: shows loading on mount
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "../src/pages/Profile";

test("shows loading message while fetching user info", () => {
  render(
    <MemoryRouter>
      <Profile />
    </MemoryRouter>
  );

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

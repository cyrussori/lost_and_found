import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Profile from "../src/pages/Profile";
import * as api from "../src/services/api";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// Mock fetch
global.fetch = vi.fn();

// Mock markResolved API
vi.spyOn(api, "markResolved").mockResolvedValue({ success: true });

const mockUser = { id: 1, name: "Josie Bruin", email: "josieBruin@ucla.edu" };
const mockPosts = [
  { _id: "p1", user_id: 1, title: "Lost Wallet", status: "Open" },
  { _id: "p2", user_id: 2, title: "Found Keys", status: "Open" },
];

describe("Profile component", () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  it("shows loading initially", () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });

    render(
      <MemoryRouter>
        <Profile posts={[]} setPosts={vi.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders user info and posts correctly", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });

    render(
      <MemoryRouter>
        <Profile posts={mockPosts} setPosts={vi.fn()} />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(mockUser.name)).toBeInTheDocument()
    );
    expect(screen.getByText(mockUser.email)).toBeInTheDocument();
    expect(screen.getByText("Lost Wallet")).toBeInTheDocument();
    expect(screen.queryByText("Found Keys")).not.toBeInTheDocument();
  });

  it("shows message when user has no posts", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user: { id: 99, name: "NoPost", email: "nopost@test.com" },
      }),
    });

    render(
      <MemoryRouter>
        <Profile posts={mockPosts} setPosts={vi.fn()} />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText("NoPost")).toBeInTheDocument());
    expect(screen.getByText("Report a Lost/Found item")).toBeInTheDocument();
  });

  it("switches tab correctly", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ user: mockUser }),
    });

    render(
      <MemoryRouter>
        <Profile posts={mockPosts} setPosts={vi.fn()} />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText(mockUser.name));

    const postsTab = screen.getByText("Posts");
    fireEvent.click(postsTab);
    expect(screen.getByText("Lost Wallet")).toBeInTheDocument();
  });
});

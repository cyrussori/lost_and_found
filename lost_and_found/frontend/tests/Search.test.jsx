import { describe, it, beforeEach, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Search from "../src/pages/Search";
import * as api from "../src/services/api.js";

// Mock data
const mockCurrentUser = { id: 1, name: "Test User", email: "test@example.com" };
const mockPosts = [
  {
    id: 1,
    title: "Lost Phone",
    description: "Black iPhone",
    post_type: "Lost",
    category: "Electronics",
    status: "Open",
  },
  {
    id: 2,
    title: "Found Wallet",
    description: "Leather wallet",
    post_type: "Found",
    category: "Wallet",
    status: "Open",
  },
  {
    id: 3,
    title: "Lost Jacket",
    description: "Blue jacket",
    post_type: "Lost",
    category: "Clothes",
    status: "Open",
  },
  {
    id: 4,
    title: "Found Keys",
    description: "Set of keys",
    post_type: "Found",
    category: "Keys",
    status: "Open",
  },
];

describe("Search page", () => {
  let setAllPosts;

  beforeEach(async () => {
    setAllPosts = vi.fn();

    render(
      <MemoryRouter>
        <Search
          posts={mockPosts}
          setAllPosts={setAllPosts}
          currentUser={mockCurrentUser}
        />
      </MemoryRouter>
    );

    // Wait for posts to be rendered
    await waitFor(() =>
      expect(screen.getByText("Lost Phone")).toBeInTheDocument()
    );
  });

  it("renders all posts initially", () => {
    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  it("filters posts by search term", async () => {
    const input = screen.getByPlaceholderText(/search posts/i);
    fireEvent.change(input, { target: { value: "jacket" } });

    await waitFor(() => {
      expect(screen.getByText("Lost Jacket")).toBeInTheDocument();
      expect(screen.queryByText("Lost Phone")).not.toBeInTheDocument();
    });
  });

  it("shows 'No posts found' if nothing matches", async () => {
    const input = screen.getByPlaceholderText(/search posts/i);
    fireEvent.change(input, { target: { value: "nonexistent" } });

    await waitFor(() => {
      expect(screen.getByText("No posts found")).toBeInTheDocument();
    });
  });

  it("filters posts by type", async () => {
    const typeSelect = screen.getAllByRole("combobox")[0];
    fireEvent.change(typeSelect, { target: { value: "Found" } });

    await waitFor(() => {
      expect(screen.getByText("Found Wallet")).toBeInTheDocument();
      expect(screen.getByText("Found Keys")).toBeInTheDocument();
      expect(screen.queryByText("Lost Phone")).not.toBeInTheDocument();
    });
  });

  it("filters posts by category", async () => {
    const selects = await screen.findAllByRole("combobox");
    const categorySelect = selects[1];

    fireEvent.change(categorySelect, {
      target: { value: "Electronics" },
    });

    await waitFor(() => {
      expect(screen.getByText("Lost Phone")).toBeInTheDocument();
      expect(screen.queryByText("Lost Jacket")).not.toBeInTheDocument();
    });
  });
});

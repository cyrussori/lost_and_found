import { describe, it, beforeEach, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Search from "../src/pages/Search";
import * as api from "../src/services/api";

// Mock data
const mockPosts = [
  {
    id: 1,
    title: "Lost Phone",
    description: "Black iPhone",
    type: "lost",
    category: "electronics",
  },
  {
    id: 2,
    title: "Found Wallet",
    description: "Leather wallet",
    type: "found",
    category: "accessories",
  },
  {
    id: 3,
    title: "Lost Jacket",
    description: "Blue jacket",
    type: "lost",
    category: "clothes",
  },
  {
    id: 4,
    title: "Found Keys",
    description: "Set of keys",
    type: "found",
    category: "other",
  },
];

// Mock getPosts API
vi.spyOn(api, "getPosts").mockResolvedValue(mockPosts);

describe("Search page", () => {
  beforeEach(async () => {
    render(
      <MemoryRouter>
        <Search />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText("Lost Phone")).toBeInTheDocument()
    );
  });

  // Test 1: renders all posts
  it("renders all posts initially", () => {
    mockPosts.forEach((post) => {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    });
  });

  // Test 2: searches through search terms
  it("filters posts by search term", async () => {
    const input = screen.getByPlaceholderText(/search posts/i);
    fireEvent.change(input, { target: { value: "jacket" } });

    await waitFor(() => {
      expect(screen.getByText("Lost Jacket")).toBeInTheDocument();
      expect(screen.queryByText("Lost Phone")).not.toBeInTheDocument();
    });
  });

  // Test 3: shows "No posts found" correctly
  it("shows 'No posts found' if nothing matches", async () => {
    const input = screen.getByPlaceholderText(/search posts/i);
    fireEvent.change(input, { target: { value: "nonexistent" } });

    await waitFor(() => {
      expect(screen.getByText("No posts found")).toBeInTheDocument();
    });
  });

  // Test 4: filters correct by lost / found type
  it("filters posts by type", async () => {
    const typeSelect = screen.getAllByRole("combobox")[0];
    fireEvent.change(typeSelect, { target: { value: "found" } });

    await waitFor(() => {
      expect(screen.getByText("Found Wallet")).toBeInTheDocument();
      expect(screen.getByText("Found Keys")).toBeInTheDocument();
      expect(screen.queryByText("Lost Phone")).not.toBeInTheDocument();
    });
  });
});

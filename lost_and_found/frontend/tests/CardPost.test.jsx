import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CardPost from "../src/components/CardPost.jsx";

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ email: "alice@example.com" }),
    })
  );
});

test("fetches and displays poster email", async () => {
  const post = {
    id: 1,
    user_id: 123,
    user_name: "Alice",
    title: "Lost Wallet",
    description: "Black wallet",
    category: "Wallet",
  };

  render(
    <MemoryRouter>
      <CardPost post={post} />
    </MemoryRouter>
  );

  fireEvent.click(screen.getByText("Show Contact"));

  await waitFor(() => {
    expect(screen.getByText("alice@example.com")).toBeInTheDocument();
  });
});

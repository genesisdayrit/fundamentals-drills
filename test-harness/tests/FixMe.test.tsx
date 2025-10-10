import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import FixMe from "../src/FixMe";

// Unmount React trees between tests
afterEach(() => {
  cleanup();
});

describe("FixMe component", () => {
  beforeEach(() => {
    render(<FixMe initialCount={2} />);
  });

  it("shows the initial count and increments when clicked", () => {
    const count = screen.getByTestId("count");
    expect(count).toHaveTextContent("Count: 2");
    const btn = screen.getByRole("button", { name: /increment/i });
    fireEvent.click(btn);
    expect(count).toHaveTextContent("Count: 3");
    fireEvent.click(btn);
    expect(count).toHaveTextContent("Count: 4");
  });

  it("computes trimmed length and shows greeting only when non-empty", () => {
    const input = screen.getByTestId("name-input") as HTMLInputElement;
    const length = screen.getByTestId("name-length");
    const greeting = screen.getByTestId("greeting");

    fireEvent.change(input, { target: { value: "   " } });
    expect(length).toHaveTextContent("Length: 0");
    expect(greeting).not.toBeVisible();

    fireEvent.change(input, { target: { value: "Ada" } });
    expect(length).toHaveTextContent("Length: 3");
    expect(greeting).toBeVisible();
    expect(greeting).toHaveTextContent("Hello, Ada!");
  });
});

describe("FixMe component 2", () => {
  beforeEach(() => {
    render(<FixMe initialCount={2} />);
  });

  it("computes trimmed length and shows greeting only when non-empty", () => {
    const input = screen.getByTestId("name-input") as HTMLInputElement;
    const length = screen.getByTestId("name-length");
    const greeting = screen.getByTestId("greeting");

    fireEvent.change(input, { target: { value: "   " } });
    expect(length).toHaveTextContent("Length: 0");
    expect(greeting).not.toBeVisible();

    fireEvent.change(input, { target: { value: "Ada" } });
    expect(length).toHaveTextContent("Length: 3");
    expect(greeting).toBeVisible();
    expect(greeting).toHaveTextContent("Hello, Ada!");
  });
});

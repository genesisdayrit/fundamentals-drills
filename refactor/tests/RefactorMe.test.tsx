import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import RefactorMe from "../src/RefactorMe";

afterEach(() => {
  cleanup();
});

describe("RefactorMe (Counter Panel)", () => {
  beforeEach(() => {
    render(<RefactorMe />);
  });

  it("renders title and three counters", () => {
    expect(screen.getByTestId("title")).toHaveTextContent("Counter Panel");
    expect(screen.getByLabelText("counter-A")).toBeInTheDocument();
    expect(screen.getByLabelText("counter-B")).toBeInTheDocument();
    expect(screen.getByLabelText("counter-C")).toBeInTheDocument();
  });

  it("shows initial values, parity, and sign", () => {
    expect(screen.getByTestId("value-A")).toHaveTextContent("0");
    expect(screen.getByTestId("parity-A")).toHaveTextContent("even");
    expect(screen.getByTestId("sign-A")).toHaveTextContent("non-negative");

    expect(screen.getByTestId("value-B")).toHaveTextContent("0");
    expect(screen.getByTestId("parity-B")).toHaveTextContent("even");
    expect(screen.getByTestId("sign-B")).toHaveTextContent("non-negative");

    expect(screen.getByTestId("value-C")).toHaveTextContent("0");
    expect(screen.getByTestId("parity-C")).toHaveTextContent("even");
    expect(screen.getByTestId("sign-C")).toHaveTextContent("non-negative");

    expect(screen.getByTestId("summary-total")).toHaveTextContent("Total: 0");
    expect(screen.getByTestId("summary-max")).toHaveTextContent("Max: 0");
  });

  it("updates a single counter using step and buttons", () => {
    const stepB = screen.getByTestId("step-input-B") as HTMLInputElement;
    fireEvent.change(stepB, { target: { value: "2" } });
    expect(stepB.value).toBe("2");

    fireEvent.click(screen.getByTestId("inc-B"));
    fireEvent.click(screen.getByTestId("inc-B"));
    expect(screen.getByTestId("value-B")).toHaveTextContent("4");
    expect(screen.getByTestId("parity-B")).toHaveTextContent("even");
    expect(screen.getByTestId("sign-B")).toHaveTextContent("non-negative");

    expect(screen.getByTestId("summary-total")).toHaveTextContent("Total: 4");
    expect(screen.getByTestId("summary-max")).toHaveTextContent("Max: 4");
  });

  it("supports decrement and negative sign label", () => {
    const stepA = screen.getByTestId("step-input-A") as HTMLInputElement;
    fireEvent.change(stepA, { target: { value: "3" } });
    fireEvent.click(screen.getByTestId("dec-A"));
    expect(screen.getByTestId("value-A")).toHaveTextContent("-3");
    expect(screen.getByTestId("sign-A")).toHaveTextContent("negative");
    expect(screen.getByTestId("parity-A")).toHaveTextContent("odd");
  });

  it("resets a counter", () => {
    const stepC = screen.getByTestId("step-input-C") as HTMLInputElement;
    fireEvent.change(stepC, { target: { value: "5" } });
    fireEvent.click(screen.getByTestId("inc-C"));
    expect(screen.getByTestId("value-C")).toHaveTextContent("5");
    fireEvent.click(screen.getByTestId("reset-C"));
    expect(screen.getByTestId("value-C")).toHaveTextContent("0");
  });

  it("handles invalid numeric input by treating it as 0", () => {
    const stepB = screen.getByTestId("step-input-B") as HTMLInputElement;
    fireEvent.change(stepB, { target: { value: "" } });
    fireEvent.click(screen.getByTestId("inc-B"));
    expect(screen.getByTestId("value-B")).toHaveTextContent("0");
  });
});

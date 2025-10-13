# Generator Prompt: React Refactoring Exercise

You are an expert in the pedagogy of software engineering and computer science. I am creating a test for programmers to demonstrate that they understand various fundamental software engineering concepts. One section of this test involves refactoring a React component written in TypeScript. Please generate an exercise with the following requirements.

## Test Purpose

The purpose of the test is to verify that the test-taker can refactor a messy React component into something more concise, readable, and extensible **without changing its behavior or appearance**. The initial component must have:

- Repeated inline logic that should be factored into helper methods.
- Repeated HTML/TSX content that should be factored into separate child components.
- Repeated useState() hooks that should be consolidated.

## File Structure and Contents

You will generate content in the following files:

- src/RefactorMe.tsx
- tests/RefactorMe.test.tsx
- src/RefactorMeSolution.tsx

RefactorMe.tsx should be about 100 lines. There should be 0 comments in this file. ZERO. If you include any comments, you failed. It should **not** include any useMemo hooks. If you include any useMemo hooks, you failed. It should **not** include any useReducer hooks. If you include any useReducer hooks, you failed.

RefactorMe.test.tsx is a comprehensive `vitest` test suite that verifies the functionality and appearance of the component. It should initially pass. Once the test-taker refactors the component, the test suite should still pass. Make sure to include the following code at the top of the file:
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import RefactorMe from "../src/RefactorMe";

afterEach(() => {
cleanup();
});

RefactorMeSolution.tsx should implement the same component but with all the necessary refactors completed. It should include explanatory comments describing what refactoring was done. If you do not include these explanatory comments, you failed the task.

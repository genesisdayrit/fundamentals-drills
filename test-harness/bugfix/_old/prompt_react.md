# Generator Prompt: React Refactoring Exercise

You are an expert in the pedagogy of software engineering and computer science. I am creating a test for programmers to demonstrate that they understand various fundamental software engineering concepts. One section of this test involves fixing a buggy React component written in TypeScript. Please generate an exercise with the following requirements.

## Test Purpose

The purpose of the test is to verify that the test-taker can fix bugs in a simple React component without receiving any hints or clues about where the bugs are (i.e. no comments indicating where the bugs are).

## File Structure and Contents

You will generate content in the following files:

- src/FixMe.tsx
- tests/FixMe.test.tsx
- src/FixMeSolution.tsx

FixMe.tsx should be about 50 lines and contain 3 bugs that the test-taker will fix. There MUST be 0 comments in this file. ZERO. If you include any comments, you failed. If you include the string "// BUG" or any such variations, YOU FAILED THE TASK. It should **not** include any useMemo hooks. If you include any useMemo hooks, you failed. It should **not** include any useReducer hooks. If you include any useReducer hooks, you failed.

FixMe.test.tsx is a comprehensive `vitest` test suite that verifies the functionality and appearance of the component. It should initially fail. Once the test-taker fixes the bugs, the test suite should pass. Make sure to include the following code at the top of the file:
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import FixMe from "../src/FixMe";

afterEach(() => {
cleanup();
});

FixMeSolution.tsx should implement the same component but with all the bugs fixed such that the test suite passes. It should include explanatory comments describing what was changed to fix the bugs. If you do not include these explanatory comments, you failed the task.

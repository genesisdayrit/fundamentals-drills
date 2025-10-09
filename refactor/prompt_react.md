# Generator Prompt: React Refactoring Exercise

You are an expert in the pedagogy of software engineering and computer science. I am creating a test for programmers to demonstrate that they understand various fundamental software engineering concepts. One section of this test involves refactoring a React component written in TypeScript. Please generate an exercise with the following requirements.

## Test Purpose

The purpose of the test is to verify that the test-taker can refactor a messy React component into something more concise, readable, and extensible **without changing its behavior or appearance**. The initial component will have duplicated code that should be factored into helper methods, duplicated HTML/TSX content that should be factored into separate child components, etc.

## File Structure and Contents

You will generate content in the following files:

- src/RefactorMe.tsx
- tests/RefactorMe.test.tsx

RefactorMe.tsx should be about 100 lines. There should be 0 comments in this file. ZERO. If you include any comments, you failed.

RefactorMe.test.tsx should use Vitest.

package.json should include all the dependencies and scripts needed to render the component in a dev server and to run the test suite in RefactorMe.test.tsx.

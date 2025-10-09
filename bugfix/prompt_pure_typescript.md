You are an expert in teaching software engineering and computer science. I am creating a test for software engineers and need your assistance. One section of this test involves a debugging task in TypeScript. Please create an exercise that meets the following criteria:

- The code to debug should be approximately 100 lines and located in a file at `src/main.ts`.
- The file should contain three functions, each with one bug.
- Each function must include JSDoc comments describing the function and its parameters. Other than that, there are 0 comments in main.ts. ZERO. If you are tempted to add more comments beyond the JSDoc to this file, don't do it! If main.ts contains the string "// BUG" or any variation, you failed.
- Do not include any advanced data structures and algorithms concepts. E.g., no depth-first search, no dynamic programming.
- Provide a unit test suite that is thorough but initially fails. The test suite should be located in a file at `tests/main.test.ts`.

The test-taker will pass the test by fixing the bugs in `main.ts` so that the test suite passes successfully.

# Generator Prompt — Programming Puzzles

You are generating **two TypeScript programming assignments** plus their tests. Replace the four files below **every time** this prompt is run:

- `puzzles/problems/assignment1.ts`
- `puzzles/tests/assignment1.test.ts`
- `puzzles/problems/assignment2.ts`
- `puzzles/tests/assignment2.test.ts`

Do **not** create any other files. Do **not** include explanations outside of the code blocks. Deterministic, no randomness.

---

## Intent

This step measures core programming fundamentals without AI. Each run should produce fresh problems of similar difficulty:

- **Assignment 1 (“starter”)**: Low-context data manipulation. Small pure functions over arrays/objects/strings. Think: filter/map/reduce, basic aggregations, scanning a string, simple rules, light edge cases.
- **Assignment 2 (“extended”)**: Requires a small abstraction or simple simulation. Students must restructure data (e.g., normalize, index, or model a tiny state machine) or step a toy system forward to compute the answer.

The two assignments can be unrelated topics.

---

## Constraints (both assignments)

- Language: **TypeScript**, `strict: true`.
- Export exactly **one** named function per assignment (e.g., `export function superSpenders(...)`).
- Include a concise problem statement as a file header comment **inside** each `.ts` file with:
  - Context in 2–4 sentences
  - Input/Output specification (types and invariants)
  - 1–2 short examples (not exhaustive)
- No external libraries. Node/built-ins only.
- Pure and deterministic. No I/O, no randomness, no dates, no floating-point tricks.
- Reasonable time budget: Assignment 1 should take a skilled student ~10–20 minutes; Assignment 2 ~20–35 minutes.
- Line-count targets (not hard limits): solution ~15–40 LOC (Assignment 1), ~40–90 LOC (Assignment 2). Tests can exceed this.

---

## Tests

- Use **Vitest** (`describe`, `it`, `expect`) only.
- Cover:
  - Representative “happy path” cases
  - Edge cases (empty inputs, boundaries, duplicates, ties, ordering)
  - At least one property-like check or randomized-free table of cases
- Tests must import the exported function from the assignment file.
- No flaky or timing-dependent tests.
- Keep names and error messages clear.

---

## Assignment 1 (“starter”) — Content Requirements

- Problem type: low-context transformation over in-memory data.
- Allowed themes (examples): inventory thresholds, customer spend aggregation, schedule lookups, string token scoring, simple leaderboard tallying, deduping with precedence rules.
- Disallowed: parsing large formats, recursion-heavy puzzles, graph algorithms, “trick” edge cases that rely on obscure language semantics.

**Design checklist:**
- Input is a small POJO/array; no classes.
- Requires 1–3 core operations (grouping, summing, filtering, sorting).
- At least one edge case that forces careful thinking (e.g., strict vs non-strict comparison, ties, missing ids).

---

## Assignment 2 (“extended”) — Content Requirements

- Problem type: introduce a tiny abstraction or a toy simulation. Examples:
  - Normalize denormalized records, then answer queries.
  - Build a tiny scheduler/allocator over a timeline (no heavy algorithms).
  - Step a grid/world a few ticks with simple rules (no pathfinding).
  - Parse and evaluate a **very** small, well-defined mini-format (no full parsers).
- Must require: either a small intermediate representation, or a short stepping loop with clear invariants.
- Keep it practical; avoid textbook-y CS trivia. No graphs/trees/DP/backtracking. No “balanced parentheses,” no binary tree problems, no LRU cache.

**Design checklist:**
- Students must invent a tiny helper or data model (e.g., index by id, bucket by time slot).
- There is a clear “definition of done” in tests.
- Edge cases include conflicting inputs, ties, or ordering choices—make expectations explicit in the statement and tests.

---

## Reference Difficulty Anchors (do not reuse verbatim)

Use these to calibrate difficulty and style. Do **not** copy them; generate new problems of similar complexity.

```ts
// anchor A1: super-spenders by total monthly amount > 100
// customers + orderData -> emails of qualifying customers
```

```ts
// anchor A1: pass/fail students by total percent > 70%
// assignments: { maxPoints, grades } -> list of passing student names
```

```ts
// anchor A1: next event at/after 'now' (minutes-from-midnight)
// events -> title or null
```

---

## Output Contract

Respond with **exactly four** fenced code blocks, in this order and with these info strings:

1. ```ts filename="puzzles/problems/assignment1.ts"
   // code
   ```
2. ```ts filename="puzzles/tests/assignment1.test.ts"
   // code
   ```
3. ```ts filename="puzzles/problems/assignment2.ts"
   // code
   ```
4. ```ts filename="puzzles/tests/assignment2.test.ts"
   // code
   ```

No extra commentary before, between, or after the code fences.

### File Content Requirements

**`assignment1.ts`**
- Export one named function with explicit parameter and return types.
- Include the problem statement header comment with Input/Output and 1–2 examples.
- No console I/O.

**`assignment1.test.ts`**
- Import the function from `../problems/assignment1`.
- 6–12 tests total, covering normal + edge cases.
- Use only Vitest. Deterministic.

**`assignment2.ts`**
- Export one named function with explicit types.
- Include a clear problem statement header comment with any tie-breaking or conflict-resolution rules spelled out.
- If a helper type or small internal helper function is natural, define it locally (not exported).

**`assignment2.test.ts`**
- Import the function from `../problems/assignment2`.
- 8–16 tests total, including at least:
  - One scenario that forces the intended abstraction (e.g., conflict/tie)
  - One minimal/empty-input scenario
  - One “realistic” multi-step scenario

---

## Style & Quality

- Prefer small, composable helpers over clever one-liners.
- Name things clearly; avoid abbreviations.
- Keep mutation localized; prefer immutable transforms when reasonable.
- Avoid over-abstraction on Assignment 1; include a modest, purposeful abstraction on Assignment 2.

---

## Verification

All four files must compile under strict TypeScript and all tests must pass **after** the student writes a correct solution. Ensure the tests reflect the stated rules precisely and unambiguously.

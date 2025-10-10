import React, { useState } from "react";

type Props = {
  initialCount?: number;
};

export default function FixMe({ initialCount = 0 }: Props) {
  const [count, setCount] = useState<number>(initialCount);
  const [name, setName] = useState<string>("");

  function handleIncrement() {
    setCount((prev) => prev + 1);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  const trimmed = name.trim();
  const nameLen = trimmed.length;
  const showGreeting = nameLen > 0;

  return (
    <div>
      <h1>FixMe</h1>
      <p data-testid="count">Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="Type your name"
          value={name}
          onChange={handleNameChange}
          data-testid="name-input"
        />
      </div>

      <p>
        <span data-testid="name-length">Length: {nameLen}</span>
      </p>

      {showGreeting ? (
        <p data-testid="greeting">Hello, {trimmed}!</p>
      ) : (
        <p data-testid="greeting" style={{ visibility: "hidden" }}>
          Hello
        </p>
      )}
    </div>
  );
}

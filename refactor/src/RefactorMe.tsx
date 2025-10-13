import React, { useState } from "react";

type Id = "A" | "B" | "C";

function label(id: Id) {
  if (id === "A") return "Alpha";
  if (id === "B") return "Beta";
  return "Gamma";
}

export default function RefactorMe() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  const [stepA, setStepA] = useState(1);
  const [stepB, setStepB] = useState(1);
  const [stepC, setStepC] = useState(1);

  const total = a + b + c;
  const max = Math.max(a, b, c);

  return (
    <div aria-label="panel">
      <h1 data-testid="title">Counter Panel</h1>

      <section aria-label="counter-A">
        <h2>{label("A")}</h2>
        <div>
          <div>
            <span data-testid="value-A">{a}</span>{" "}
            <span data-testid="parity-A">{a % 2 === 0 ? "even" : "odd"}</span>{" "}
            <span data-testid="sign-A">
              {a >= 0 ? "non-negative" : "negative"}
            </span>
          </div>
          <div>
            <label htmlFor="step-A">Step</label>
            <input
              id="step-A"
              data-testid="step-input-A"
              type="number"
              value={stepA}
              onChange={(e) => {
                const v = parseInt(e.target.value || "0", 10);
                if (Number.isNaN(v)) setStepA(0);
                else setStepA(v);
              }}
            />
          </div>
          <div>
            <button
              data-testid="inc-A"
              onClick={() => setA(a + (typeof stepA === "number" ? stepA : 0))}
            >
              +
            </button>
            <button
              data-testid="dec-A"
              onClick={() => setA(a - (typeof stepA === "number" ? stepA : 0))}
            >
              -
            </button>
            <button data-testid="reset-A" onClick={() => setA(0)}>
              reset
            </button>
          </div>
        </div>
      </section>

      <section aria-label="counter-B">
        <h2>{label("B")}</h2>
        <div>
          <div>
            <span data-testid="value-B">{b}</span>{" "}
            <span data-testid="parity-B">{b % 2 === 0 ? "even" : "odd"}</span>{" "}
            <span data-testid="sign-B">
              {b >= 0 ? "non-negative" : "negative"}
            </span>
          </div>
          <div>
            <label htmlFor="step-B">Step</label>
            <input
              id="step-B"
              data-testid="step-input-B"
              type="number"
              value={stepB}
              onChange={(e) => {
                const v = parseInt(e.target.value || "0", 10);
                if (Number.isNaN(v)) setStepB(0);
                else setStepB(v);
              }}
            />
          </div>
          <div>
            <button
              data-testid="inc-B"
              onClick={() => setB(b + (typeof stepB === "number" ? stepB : 0))}
            >
              +
            </button>
            <button
              data-testid="dec-B"
              onClick={() => setB(b - (typeof stepB === "number" ? stepB : 0))}
            >
              -
            </button>
            <button data-testid="reset-B" onClick={() => setB(0)}>
              reset
            </button>
          </div>
        </div>
      </section>

      <section aria-label="counter-C">
        <h2>{label("C")}</h2>
        <div>
          <div>
            <span data-testid="value-C">{c}</span>{" "}
            <span data-testid="parity-C">{c % 2 === 0 ? "even" : "odd"}</span>{" "}
            <span data-testid="sign-C">
              {c >= 0 ? "non-negative" : "negative"}
            </span>
          </div>
          <div>
            <label htmlFor="step-C">Step</label>
            <input
              id="step-C"
              data-testid="step-input-C"
              type="number"
              value={stepC}
              onChange={(e) => {
                const v = parseInt(e.target.value || "0", 10);
                if (Number.isNaN(v)) setStepC(0);
                else setStepC(v);
              }}
            />
          </div>
          <div>
            <button
              data-testid="inc-C"
              onClick={() => setC(c + (typeof stepC === "number" ? stepC : 0))}
            >
              +
            </button>
            <button
              data-testid="dec-C"
              onClick={() => setC(c - (typeof stepC === "number" ? stepC : 0))}
            >
              -
            </button>
            <button data-testid="reset-C" onClick={() => setC(0)}>
              reset
            </button>
          </div>
        </div>
      </section>

      <footer>
        <div data-testid="summary-total">Total: {total}</div>
        <div data-testid="summary-max">Max: {max}</div>
      </footer>
    </div>
  );
}

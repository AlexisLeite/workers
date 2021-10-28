import React, { ReactElement } from 'react';
import { CountProvider, useCount } from './context';

interface IndexProps {}

function CountDisplay() {
  const { dispatch, state } = useCount();
  return (
    <div>
      <style jsx>{`
        div {
          text-align: center;
        }

        button:first-of-type {
          margin-right: 10px;
        }
        button {
          padding: 10px;
          font-size: 2em;
          width: 50px;
        }
      `}</style>
      <h1>{state.count}</h1>
      <div>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      </div>
    </div>
  );
}

export default function Index({}: IndexProps): ReactElement {
  return (
    <CountProvider>
      <CountDisplay />
    </CountProvider>
  );
}

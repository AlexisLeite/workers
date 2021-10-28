import React, { ReactElement } from 'react';

export const CountContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(
  undefined
);

type State = { count: number };
type Dispatch = (action: Action) => void;
type Action = { type: 'increment' | 'decrement' };
type CountProviderProps = { children: ReactElement[] | ReactElement };

function countReducer(state: State, action: Action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error(`Unhandled action type: ${action}`);
  }
}

export function CountProvider({ children }: CountProviderProps) {
  const [state, dispatch] = React.useReducer(countReducer, { count: 0 });

  const value = { state, dispatch };
  return <CountContext.Provider value={value}>{children}</CountContext.Provider>;
}

export function useCount() {
  const context = React.useContext(CountContext);

  if (!context) {
    throw new Error('useCount must be used within a CountProvider');
  }

  return context;
}

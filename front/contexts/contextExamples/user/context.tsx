import React, { ReactElement } from 'react';

export type User = {
  name: string;
  age: number;
};

const UserContext = React.createContext<{ state: User; updateUser: Dispatch } | undefined>(
  undefined
);

type Dispatch = (action: User) => void;

function userReducer(state: User, user: User) {
  return user;
}

export function UserProvider({ children }: { children: ReactElement | ReactElement[] }) {
  const [state, updateUser] = React.useReducer(userReducer, { name: 'Alexis', age: 30 });
  const value = { state, updateUser };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = React.useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserContext');
  }

  return context;
}

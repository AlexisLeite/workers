import React, { ReactElement } from 'react';
import { User, UserProvider, useUser } from './context';

interface IndexProps {}

function UserDetails() {
  const { state } = useUser();
  return (
    <div>
      Name: {state.name}, age: {state.age}
    </div>
  );
}

function UpdateUser() {
  const { updateUser } = useUser();
  return (
    <form
      onSubmit={function (
        ev: React.FormEvent & { target: { querySelector?: (query: string) => { value: string } } }
      ) {
        ev.preventDefault();
        if (ev.target.querySelector) {
          const newUser = {
            name: ev.target.querySelector('[placeholder="Name"]').value as string,
            age: parseInt(ev.target.querySelector('[placeholder="Age"]').value),
          };

          updateUser(newUser);
        }
      }}
    >
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Age" />
      <input type="submit" value="Update" />
    </form>
  );
}

export default function Index({}: IndexProps): ReactElement {
  return (
    <div>
      <UserProvider>
        <UserDetails />
        <UpdateUser />
      </UserProvider>
    </div>
  );
}

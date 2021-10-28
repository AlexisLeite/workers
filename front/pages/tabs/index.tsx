import React, { ReactElement } from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tabs, TabsManager } from '../../services/tabs';
import styles from './styles.module.sass';
import { TabButton } from './../../services/tabs';

interface IndexProps {}
const Users: User[] = [
  { name: 'Alexis', age: 30 },
  { name: 'Valeria', age: 33 },
  { name: 'Alito', age: 10 },
  { name: 'Jorge', age: 28 },
  { name: 'Silvia', age: 50 },
  { name: 'Alexiads', age: 30 },
  { name: 'Vasdfleria', age: 33 },
  { name: 'Alifsadto', age: 10 },
  { name: 'Jofdrge', age: 28 },
  { name: 'Sfasdilvia', age: 50 },
];
type User = {
  name: string;
  age: number;
};
function UserDetails({ user }: { user: User }) {
  return (
    <>
      {user.name}, age: {user.age}
    </>
  );
}
function ListUsers() {
  return (
    <ul className={styles.ListUsers}>
      {Users.map((user) => (
        <li key={user.name}>
          <TabButton
            title={user.name}
            content={<UserDetails user={user} />}
            unique={`${user.name}+${user.age}`}
          >
            {user.name}, age {user.age}
          </TabButton>
        </li>
      ))}
    </ul>
  );
}

export default function Index({}: IndexProps): ReactElement {
  React.useEffect(() => {
    TabsManager.add({ title: 'Dashboard', content: <ListUsers />, unique: 'Doesnt care' });
  }, []);
  return <Tabs />;
}

Index.getLayout = (page: ReactElement) => <div>{page}</div>;

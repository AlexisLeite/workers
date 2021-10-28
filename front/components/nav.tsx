import React, { ReactElement } from 'react';
import Link from 'next/link';

interface NavProps {}

export default function Nav({}: NavProps): ReactElement {
  return (
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/workers">
        <a>Workers</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <style jsx>{`
        nav {
          display: flex;
          justify-content: center;
        }

        a {
          display: block;
          padding: 15px 25px;
        }
      `}</style>
    </nav>
  );
}

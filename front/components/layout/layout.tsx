import React, { ReactElement } from 'react';
import Nav from '../nav';
import Back from '../back';

interface LayoutProps {
  children: ReactElement | ReactElement[];
  full?: boolean;
}

export default function Layout({ full, children }: LayoutProps): ReactElement {
  const style = !full ? (
    <style jsx>{`
      main {
        height: calc(100vh - 40px);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `}</style>
  ) : (
    <></>
  );
  return (
    <>
      <Back>
        <header>
          <Nav />
        </header>
        <main>
          {style}
          {children}
        </main>
      </Back>
    </>
  );
}

import React, { ReactElement } from 'react';
import Link from 'next/link';

interface AboutProps {}

function About({}: AboutProps): ReactElement {
  return (
    <div>
      <style jsx>{`
        a {
          font-size: 2em;
          font-weight: bold;
        }
      `}</style>
      <a href="http://uyucode.net/documentación/matemagica" rel="noreferrer" target="_blank">
        Visit my website
      </a>
    </div>
  );
}

export default About;

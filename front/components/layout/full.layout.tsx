import React, { ReactElement } from 'react';
import Layout from './layout';

interface Props {
  children: ReactElement;
}

function FullLayout({ children }: Props): ReactElement {
  return <Layout full={true}>{children}</Layout>;
}

export default function getFullLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
}

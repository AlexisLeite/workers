import React, { ReactElement } from 'react';
import getFullLayout from './../../components/layout/full.layout';

interface AllProps {}

export default function All({}: AllProps): ReactElement {
  return <div>Hi</div>;
}

All.getLayout = getFullLayout;

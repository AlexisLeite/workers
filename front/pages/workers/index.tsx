import React, { ReactElement, useEffect } from 'react';
import WorkersWidget from '../../components/workers/widget';
import getTabsLayout from './../../components/layout/tabsLayout';

interface IndexProps {}
export default function Index({}: IndexProps): ReactElement {
  return <WorkersWidget />;
}

Index.getLayout = getTabsLayout(Index);

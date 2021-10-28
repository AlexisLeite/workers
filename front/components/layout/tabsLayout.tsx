import React from 'react';
import { Tabs, TabsManager } from '../../services/tabs';
import 'react-tabs/style/react-tabs.css';
import { TabsProps } from './../../services/tabs';
import styles from './layout.module.sass';
import Back from './../back';

export default function getTabsLayout(InitialComponent: any, {}: TabsProps = {}) {
  return function TabsLayout() {
    React.useEffect(() => {
      TabsManager.proxy({
        action: 'add',
        proxy: ({ newTab, focus }) => {
          newTab.content = <div className={styles.tabPanel}>{newTab.content}</div>;
          return { newTab, focus };
        },
      });
      TabsManager.add({ title: 'Dashboard', content: <InitialComponent />, unique: 'Doesnt care' });
    }, []);
    return (
      <Back>
        <Tabs
          tabs={{
            selectedTabPanelClassName: styles.tabPanel,
          }}
        />
      </Back>
    );
  };
}

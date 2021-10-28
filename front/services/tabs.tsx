import React, { useEffect, MouseEvent, Children } from 'react';
import { Tab, Tabs as OriginalTabs, TabPanel, TabList } from 'react-tabs';
import EventEmitter from './eventEmitter';

type MyTab = {
  title: string;
  content: any;
  unique: any;
};
type TabEvent = {
  create: MyTab[];
  close: MyTab[];
  select: number;
};
interface TabProps {
  content: any;
  title: any;
  unique: string | number;
}
type TabCreateProps = TabProps & {
  [key: string]: any;
  children?: any;
  tag?: string;
};

export const TabButton = ({ content, title, unique, Tag, ...props }: TabCreateProps) => {
  Tag ??= 'button';
  return (
    <Tag
      onMouseDown={(ev: MouseEvent) => {
        switch (ev.button) {
          case 0:
            TabsManager.add({ content, title, unique });
            break;
          case 1:
            TabsManager.add({ content, title, unique }, false);
        }
      }}
      {...props}
    >
      <style jsx>{`
        ${Tag} {
          background: none;
          border: none;
          padding: 5px 10px;
          width: 100%;
          cursor: pointer;
        }

        ${Tag}:hover,
        ${Tag}:active,
        ${Tag}:focus {
          box-shadow: none;
        }
      `}</style>
      {props.children}
    </Tag>
  );
};

type Proxy<T> = (props: T) => T;
type ProxyAddProps = { newTab: TabProps; focus: boolean };
type ProxyProps = {
  action: 'add';
  proxy: (props: ProxyAddProps) => ProxyAddProps;
};
export const TabsManager = new (class extends EventEmitter<TabEvent> {
  private selected = 0;
  private tabs: MyTab[] = [];
  private proxies: { add: Proxy<ProxyAddProps>[] } = {
    add: [],
  };

  proxy(props: ProxyProps) {
    this.proxies[props.action].push(props.proxy);
  }

  add(newTab: TabProps, focus = true) {
    let props = { newTab, focus };
    for (let proxy of this.proxies.add) {
      props = proxy(props);
    }
    for (let index in this.tabs) {
      const tab = this.tabs[index];
      if (tab.unique === newTab.unique) {
        // If the tab exists, focus it
        if (props.focus) this.select(parseInt(index));
        return;
      }
    }

    // If it doesn't exist, create it
    this.tabs.push(props.newTab);
    this.emit('create', [...this.tabs]);

    // Select the recently created tab
    if (props.focus) setTimeout(() => this.select(this.tabs.length - 1), 0);
  }
  remove(index: number) {
    this.tabs.splice(index, 1);
    this.emit('close', [...this.tabs]);
    if (index <= this.selected) this.select(this.selected - 1);
  }
  select(index: number) {
    this.selected = index;
    this.emit('select', this.selected);
  }
})();

export interface TabsProps {
  tabs?: Record<string, any>;
  tabList?: Record<string, any>;
  tab?: Record<string, any>;
  tabPanel?: Record<string, any>;
}

export function Tabs(props: TabsProps) {
  const [tabs, updateTabs] = React.useState<MyTab[]>([]);
  const [selected, updateSelected] = React.useState<number>(0);
  useEffect(() => {
    const unsuscribers = [
      TabsManager.on('create', (tabs) => updateTabs(tabs)),
      TabsManager.on('close', (tabs) => {
        updateTabs(tabs);
      }),
      TabsManager.on('select', (id) => updateSelected(id)),
    ];

    return () => unsuscribers.forEach((unsuscribe) => unsuscribe());
  }, []);

  return (
    <OriginalTabs
      {...props.tabs}
      onSelect={(index) => {
        TabsManager.select(index);
      }}
      selectedIndex={selected}
    >
      <TabList {...props.tabList}>
        {tabs.map((tab, index) => (
          <Tab
            {...props.tab}
            key={index}
            onMouseDown={(ev) => {
              if (index && ev.button === 1) TabsManager.remove(index);
            }}
          >
            {tab.title}
            {index > 0 && (
              <button
                style={{
                  border: 'none',
                  borderRadius: '5px',
                  marginLeft: '5px',
                  padding: '0 4px',
                  fontWeight: 'bold',
                }}
                onClick={(ev) => {
                  ev.preventDefault();
                  ev.stopPropagation();
                  TabsManager.remove(index);
                }}
              >
                x
              </button>
            )}
          </Tab>
        ))}
      </TabList>
      {tabs.map((tab, index) => (
        <TabPanel {...props.tabPanel} key={index}>
          {tab.content}
        </TabPanel>
      ))}
    </OriginalTabs>
  );
}

import { memo } from 'react';
import { Drawer } from '@digi/components';
import RouteMenu from './Menu';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <Drawer
      open
      closable={false}
      getContainer={false}
      placement='left'
      width='100%'
      classNames={{ content: styles.DrawerContent }}
    >
      <RouteMenu />
    </Drawer>
  );
};

export default memo(Sidebar);

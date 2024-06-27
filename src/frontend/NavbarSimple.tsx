import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconDatabaseImport,
  IconSwitchHorizontal,
  IconLogout,
  IconFile,
} from '@tabler/icons-react';
import classes from '../css/NavbarSimple.module.css';
import { Link } from 'react-router-dom';

const data = [
  { link: "/main/html-val", label: 'Html5 Ad VAlidator', icon: IconFile },
  { link: "/main/query-dash", label: 'Query Dashboard', icon: IconDatabaseImport },
];

const NavbarSimple = () => {
  const [active, setActive] = useState('');

  const links = data.map((item) => (
    <Link
      to={item.link}
      className={classes.link}
      data-active={item.label === active || undefined}
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <img src="../src/assets/nextroll_logo.svg" alt="Logo" />
          {/* <Code color='pink' h={25} w={70} fw={1000}>Nextroll</Code> */}
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <Link to="/login" className={classes.link} onClick={() => console.log('Logout')}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </Link>

        <Link to="/login" className={classes.link} onClick={() => console.log('Logout')}>
          <IconLogout style={{color: 'red'}} className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}

export default NavbarSimple;

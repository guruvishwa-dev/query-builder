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
  { link: "/validator/html-val", label: 'Html5 Ad VAlidator', icon: IconFile },
  { link: " ", label: 'Query Dashboard', icon: IconDatabaseImport },
];

const NavbarSimple = () => {
  const [active, setActive] = useState('Billing');

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
          {/* < size={28} /> */}
          <Code fw={700}>v1.0.0</Code>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}

export default NavbarSimple;
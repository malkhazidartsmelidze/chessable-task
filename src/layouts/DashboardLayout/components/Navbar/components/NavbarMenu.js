import React from 'react';
import MenuItem from './MenuItem';
import P from 'urls';
import ChildMenu from './ChildMenu';

const NavbarMenu = (props) => {
  return (
    <div {...props}>
      <MenuItem title='Dashboard' leftIcon='import_contacts' url={P.DASHBOARD} showDivider={true} />
      <MenuItem
        title='Departaments'
        leftIcon='group'
        url={P.DEPARTAMENTS}
        description='View, Edit, Create Departaments'
        showDivider={true}
        opened={true}
      >
        <ChildMenu title='View All' leftIcon='view_list' url={P.ALL_DEPARTAMENTS} />
        <ChildMenu title='Create New Departaments' leftIcon='group_add' url={P.ALL_DEPARTAMENTS} />
      </MenuItem>
    </div>
  );
};

export default NavbarMenu;

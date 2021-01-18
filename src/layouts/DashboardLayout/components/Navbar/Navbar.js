import React from 'react';
import { Drawer, List, ListItem } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import { drawerWidth } from 'consts';
import MenuItem from 'components/Navbar/MenuItem';
import ChildMenu from 'components/Navbar/ChildMenu';
import P from 'urls';

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <Drawer classes={{ paper: classes.drawerPaper }} variant='permanent' anchor='left' {...props}>
      <List disablePadding>
        <ListItem
          data-pointer={1}
          className={clsx(classes.logo, classes.item, classes.itemCategory)}
        >
          HR System
        </ListItem>
        <MenuItem
          title='Dashboard'
          leftIcon='import_contacts'
          url={P.DASHBOARD}
          showDivider={true}
        />
        <MenuItem
          title='Companies'
          leftIcon='business_center'
          url={P.COMPANY.list}
          description='View Or Edit Your Companies'
          showDivider={true}
        >
          <ChildMenu title='View All Company' leftIcon='view_list' url={P.COMPANY.list} />
          <ChildMenu title='Create New Company' leftIcon='add_circle' url={P.COMPANY.create} />
        </MenuItem>
        <MenuItem
          title='Employees'
          leftIcon='group'
          url={P.EMPLOYEE.list}
          description='View, Edit or Create Employees'
          showDivider={true}
        >
          <ChildMenu title='View All Epmloyee' leftIcon='view_list' url={P.EMPLOYEE.list} />
          <ChildMenu title='Add New Employee' leftIcon='group_add' url={P.EMPLOYEE.create} />
        </MenuItem>
        <MenuItem
          title='Departaments'
          leftIcon='pie_chart'
          url={P.DEPARTMENT.list}
          description='View, Edit, Create Departament'
          showDivider={true}
        >
          <ChildMenu title='View All' leftIcon='view_list' url={P.DEPARTMENT.list} />
          <ChildMenu title='Create New Departament' leftIcon='post_add' url={P.DEPARTMENT.create} />
        </MenuItem>
      </List>
    </Drawer>
  );
};

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    color: '#fff',
    borderColor: theme.colors.borderColor,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'left 0 bottom 0',
    backgroundColor: theme.colors.borderColor,
    backgroundImage: `url(/images/sidebarbackground.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '256px 556px',
    transition: '0.5s all ease-in-out',
    width: drawerWidth,
  },
  logo: {
    color: theme.palette.common.white,
    height: theme.spacing(6),
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      height: theme.spacing(4),
    },
    boxShadow: '0 -1px 0 #404854 inset',
  },
}));

export default Navbar;

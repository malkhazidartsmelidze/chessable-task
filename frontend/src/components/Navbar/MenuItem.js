import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ListItem, ListItemText, Collapse, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MenuIcon from 'components/Navbar/MenuIcon';

const MenuItem = (props) => {
  const { description, showDivider, url, children, opened: defaultOpened } = props;
  const hasChildren = React.Children.count(children) > 0;
  const [opened, setOpened] = useState(defaultOpened ? true : false);
  const classes = useStyles();

  const toggleOpened = () => {
    hasChildren && setOpened(!opened);
  };

  return (
    <div className={opened ? classes.opened : ''}>
      <ListItem
        data-pointer={1}
        className={classes.listItem}
        component={hasChildren ? null : NavLink}
        to={url}
        onClick={toggleOpened}
      >
        {props.leftIcon && <MenuIcon icon={props.leftIcon} {...props.leftIconProps} />}
        <ListItemText
          secondary={description}
          secondaryTypographyProps={{
            className: clsx(classes.secondaryText, opened && classes.secondaryTextHidden),
          }}
          primary={props.title}
        />
        {props.rightIcon && <MenuIcon icon={props.rightIcon} {...props.rightIconProps} />}
      </ListItem>
      {hasChildren ? <Collapse in={opened}>{children}</Collapse> : null}
      {showDivider ? (
        <Divider className={clsx(classes.divider, !opened && classes.openedDivider)} />
      ) : null}
    </div>
  );
};

const useStyles = makeStyles(({ spacing, transitions }) => ({
  listItem: {
    padding: spacing(),
    height: '4.5rem',
    color: 'rgba(255, 255, 255, 0.7)',
    cursor: 'pointer',
    '&:hover, &:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  opened: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  secondaryText: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    transition: transitions.create('all', { duration: 200, easing: 'ease-in-out' }),
    color: 'rgba(255, 255, 255, 0.3)',
  },
  secondaryTextHidden: {
    opacity: 0,
    lineHeight: 0,
  },
  divider: {
    marginTop: spacing(2),
    backgroundColor: '#404854',
  },
  openedDivider: {
    marginTop: 0,
  },
}));

export default MenuItem;

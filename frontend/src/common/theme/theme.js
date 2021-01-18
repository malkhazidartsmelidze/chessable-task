import { createMuiTheme } from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: indigo,
  },
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial'].join(','),
    fontSize: 13,
    body2: {
      color: '#476282',
    },
  },
  colors: {
    mainText: 'rgba(255, 255, 255, 0.7)',
    secondaryText: 'rgba(255, 255, 255, 0.3)',
    borderColor: '#051e34',
    appbarBackground: '#fafafa',
    bodyColor: '#476282',
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        padding: 8,
      },
      label: {
        // for mdiIcon
        '& svg[role]': {
          fill: 'currentColor',
          width: '1em',
          height: '1em',
          display: 'inline-block',
          fontSize: '1.5rem',
          transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          flexShrink: '0',
          userSelect: 'none',
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
});

export default theme;

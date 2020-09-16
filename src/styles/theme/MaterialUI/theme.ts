import teal from '@material-ui/core/colors/teal';
import orange from '@material-ui/core/colors/orange';

const theme = {
  spacing: 4,
  palette: {
    type: 'dark',
    primary: teal,
    secondary: orange,
  },
  typography: {
    fontSize: 12,
    fontFamily: [
      '"Noto Sans JP"',
      '"Helvetica Neue"',
      'Arial',
      '"Hiragino Kaku Gothic ProN"',
      '"Hiragino Sans"',
      'Meiryo',
      'sans-serif',
    ].join(','),
    button: {
      textTransform: 'none',
    },
  },
  props: {
    MuiList: {
      dense: true,
      disablePadding: true,
    },
    MuiButton: {
      size: 'small',
      variant: 'contained',
      color: 'primary',
    },
    MuiCheckbox: {
      color: 'primary',
    },
    MuiFilledInput: {
      margin: 'dense',
    },
    MuiFormControl: {
      margin: 'dense',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiListItem: {
      dense: true,
    },
    MuiOutlinedInput: {
      margin: 'dense',
    },
    MuiSvgIcon: {
      fontSize: 'small',
    },
    MuiTabs: {
      indicatorColor: 'secondary',
      textColor: 'secondary',
    },
    MuiTextField: {
      margin: 'dense',
    },
    MuiToolbar: {
      variant: 'dense',
    },
    MuiTooltip: {
      enterDelay: 1500,
      enterNextDelay: 1000,
    },
  },
};

export default theme;

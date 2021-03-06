import React from 'react';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';

type Props = {
  children: React.ReactElement;
} & SnackbarProps;

const NoticeSnackbar: React.FC<Props> = (props) => {
  const { children } = props;
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      {...props}
    >
      {children}
    </Snackbar>
  );
};

export default NoticeSnackbar;

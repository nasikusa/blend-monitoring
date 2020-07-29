import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

export default (props: any) => {
  const { themeSettings } = props;

  const useStyles = makeStyles({
    root: {
      minHeight: themeSettings.header.appBarHeight,
    },
  });
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar className={classes.root}>
        <Typography>BlendMonitoring</Typography>
      </Toolbar>
    </AppBar>
  );
};

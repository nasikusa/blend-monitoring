import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import HeaderInfos from '../../molecules/HeaderInfos';

export default (props: any) => {
  const { themeSettings } = props;

  const useStyles = makeStyles({
    root: {
      height: themeSettings.header.appBarHeight,
      maxHeight: themeSettings.header.appBarHeight,
      minHeight: themeSettings.header.appBarHeight,
      display: 'flex',
      justifyContent: 'space-between',
    },
    logo: {
      fontFamily: "'Do Hyeon', sans-serif;",
      fontSize: '20px',
      letterSpacing: '2px',
    },
  });
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar className={classes.root}>
        <Typography className={classes.logo}>BlendMonitoring</Typography>
        <HeaderInfos />
      </Toolbar>
    </AppBar>
  );
};

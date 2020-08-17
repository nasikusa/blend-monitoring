import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

export default function () {
  const useStyles = makeStyles({
    bar: {
      height: '20px',
      maxHeight: '20px',
      minHeight: '20px',
    },
    logo: {
      fontFamily: "'Do Hyeon', sans-serif;",
      fontSize: '20px',
      letterSpacing: '2px',
    },
  });
  const classes = useStyles();

  return (
    <AppBar position="relative" className={classes.bar} color="primary">
      <Toolbar className={classes.bar}>
        <Grid container justify="flex-start" alignItems="center" />
      </Toolbar>
    </AppBar>
  );
}

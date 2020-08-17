import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import HeaderInfos from '../../molecules/HeaderInfos';
import { AppName } from '../../../constants/appConstantSettings';

import { ThemeSettingsType } from '../../../stores/themeSettings';

export type Props = {
  themeSettings: ThemeSettingsType;
};

export default function (props: Props) {
  const { themeSettings } = props;
  const [isShowHeaderInfos] = useState(true);
  const theme = useTheme();

  const useStyles = makeStyles({
    bar: {
      height: themeSettings.header.appBarHeight,
      maxHeight: themeSettings.header.appBarHeight,
      minHeight: themeSettings.header.appBarHeight,
    },
    logo: {
      fontFamily: "'Do Hyeon', sans-serif;",
      fontSize: '16px',
      letterSpacing: '2px',
      marginLeft: `${theme.spacing() * 2}px`,
    },
  });
  const classes = useStyles();

  return (
    <AppBar position="relative" className={classes.bar} color="inherit">
      <Toolbar className={classes.bar}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Grid container alignItems="center">
              <img src="/logo192.png" alt="ロゴ画像" width="18px" />
              <Typography className={classes.logo}>{AppName}</Typography>
            </Grid>
          </Grid>
          <Grid item>{isShowHeaderInfos && <HeaderInfos />}</Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

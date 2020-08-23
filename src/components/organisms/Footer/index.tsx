import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { AppSiteInfo } from '../../../constants/appConstantSettings';

type Props = {
  multiCollectionsLength: number;
  glViewItemLength: number;
  storedMediaLength: number;
};

export default function (props: Props) {
  const { multiCollectionsLength, glViewItemLength, storedMediaLength } = props;

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
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            <Grid container justify="flex-start" alignItems="center">
              <Box mx={2}>
                <Typography variant="overline">
                  レイヤー・コレクション数 : {multiCollectionsLength}
                </Typography>
              </Box>
              <Divider orientation="vertical" />
              <Box mx={2}>
                <Typography variant="overline">
                  描画アイテム数 : {glViewItemLength}
                </Typography>
              </Box>
              <Divider orientation="vertical" />
              <Box mx={2}>
                <Typography variant="overline">
                  画像の数 : {storedMediaLength}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify="flex-start" alignItems="center">
              <Box mx={2}>
                <Typography variant="overline">
                  バージョン : {AppSiteInfo.version}
                </Typography>
              </Box>
              <Divider orientation="vertical" />
              <Box mx={2}>
                <Typography variant="overline">
                  更新日時 : {AppSiteInfo.updatedAt}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

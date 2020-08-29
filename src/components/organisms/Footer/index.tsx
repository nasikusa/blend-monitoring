import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Icon from '../../atoms/Icon';
import TextWithIcon from '../../molecules/TextWithIcon';
import { AppSiteInfo } from '../../../constants/appConstantSettings';
import getDefaultColorSpace from '../../../utils/getDefaultColorSpace';

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
              <TextWithIcon iconElement={<Icon type="layer" />}>
                レイヤー・コレクション数 : {multiCollectionsLength}
              </TextWithIcon>
              <Divider orientation="vertical" />
              <TextWithIcon iconElement={<Icon type="footerFunctionDraw" />}>
                描画アイテム数 : {glViewItemLength}
              </TextWithIcon>
              <Divider orientation="vertical" />
              <TextWithIcon iconElement={<Icon type="functionImage" />}>
                画像の数 : {storedMediaLength}
              </TextWithIcon>
              <Divider orientation="vertical" />
              <TextWithIcon iconElement={<Icon type="functionPalette" />}>
                カラースペース : {getDefaultColorSpace()}
              </TextWithIcon>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify="flex-start" alignItems="center">
              <TextWithIcon iconElement={<Icon type="footerFunctionVersion" />}>
                バージョン : {AppSiteInfo.version}
              </TextWithIcon>
              <Divider orientation="vertical" />
              <TextWithIcon iconElement={<Icon type="functionTime" />}>
                更新日時 : {AppSiteInfo.updatedAt}
              </TextWithIcon>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

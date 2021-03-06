import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

/* eslint-disable import/no-unresolved */
import { AppSiteInfo } from 'constants/general/appConstantSettings';
import getDefaultColorSpace from 'utils/color/getDefaultColorSpace';
import { FileNames } from 'constants/general/dirAndFileNames';
/* eslint-enable import/no-unresolved */
import Icon from '../../atoms/Icon';
import TextWithIcon from '../../molecules/TextWithIcon';

type Props = {
  multiCollectionsLength: number;
  glViewItemLength: number;
  storedMediaLength: number;
};

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

const Footer: React.FC<Props> = (props: Props) => {
  const { multiCollectionsLength, glViewItemLength, storedMediaLength } = props;

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
              <Divider orientation="vertical" />
              <TextWithIcon iconElement={<Icon type="functionLicense" />}>
                <Link target="_blank" href={`/${FileNames.license}`}>
                  {/* TODO: 文字の色がwhite固定になってしまっているので、変えたいです */}
                  <Typography variant="overline" style={{ color: 'white' }}>
                    ライセンス情報
                  </Typography>
                </Link>
              </TextWithIcon>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;

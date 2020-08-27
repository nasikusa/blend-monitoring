import React from 'react';
import { css } from '@emotion/core';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';

import { AppSiteInfo } from '../../../constants/appConstantSettings';
import LogoImage from '../../atoms/LogoImage';

const fullStyle = css`
  width: 100%;
  height: calc(100vh - 50px);

  @media (max-width: 1200px) {
    display: none;
  }
`;

const descriptionStyle = css`
  line-height: 2;
  letter-spacing: 2px;
  white-space: pre;
`;

const DefaultWelcome = () => {
  const theme = useTheme();
  return (
    <Grid container justify="center" alignItems="center" css={fullStyle}>
      <Paper
        elevation={14}
        style={{
          backgroundColor: '#ddd',
          color: theme.palette.background.default,
        }}
      >
        <Grid container alignItems="center">
          <Box display="flex" justifyContent="center" pl={6} pr={4} py={6}>
            <LogoImage />
          </Box>
          <Box ml={2} pr={10}>
            <Typography
              display="block"
              css={descriptionStyle}
              align="center"
              gutterBottom
            >
              {AppSiteInfo.description}
            </Typography>
            <Divider />
            <Typography display="block" variant="overline" align="center">
              バージョン : {AppSiteInfo.version}
            </Typography>
            <Typography display="block" variant="overline" align="center">
              更新日時 : {AppSiteInfo.updatedAt}
            </Typography>
          </Box>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default DefaultWelcome;

import React from 'react';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import { css } from '@emotion/core';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Icon from '../../atoms/Icon';

import { AppSiteInfo } from '../../../constants/general/appConstantSettings';

export default () => {
  const theme = useTheme();
  const stringSpacingStyle = css`
    padding-left: ${theme.spacing() * 2}px;
  `;
  const iconSpacingStyle = css`
    padding-left: ${theme.spacing()}px;
  `;
  return (
    <Box display="flex">
      <Box mx={2} display="flex">
        <Typography>share :</Typography>
        <TwitterShareButton url={AppSiteInfo.url}>
          <IconButton size="small" component="span">
            <Icon type="iconTwitter" />
          </IconButton>
        </TwitterShareButton>
        <FacebookShareButton url={AppSiteInfo.url}>
          <IconButton size="small" component="span">
            <Icon type="iconFacebook" />
          </IconButton>
        </FacebookShareButton>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box mx={2} display="flex">
        <Typography>
          created by :
          <Link
            css={stringSpacingStyle}
            target="_blank"
            color="inherit"
            href="https://twitter.com/nakanasinokusa"
          >
            youkan
          </Link>
        </Typography>
        <Link
          css={iconSpacingStyle}
          target="_blank"
          color="inherit"
          href="https://github.com/nasikusa"
        >
          <IconButton size="small">
            <Icon type="iconGithub" />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

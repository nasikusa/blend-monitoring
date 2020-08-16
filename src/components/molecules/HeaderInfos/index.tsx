import React from 'react';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import { css } from '@emotion/core';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';

import { AppSiteInfo } from '../../../constants/appConstantSettings';

const stringSpacingStyle = css`
  padding-left: 8px;
`;
const iconSpacingStyle = css`
  padding-left: 4px;
`;

export default () => {
  return (
    <Box display="flex">
      <Box mx={1} display="flex">
        <Typography>share :</Typography>
        <TwitterShareButton url={AppSiteInfo.url}>
          <IconButton size="small">
            <TwitterIcon fontSize="small" />
          </IconButton>
        </TwitterShareButton>
        <FacebookShareButton url={AppSiteInfo.url}>
          <IconButton size="small">
            <FacebookIcon fontSize="small" />
          </IconButton>
        </FacebookShareButton>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box mx={1} display="flex">
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
            <GitHubIcon fontSize="small" />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
};

import React from 'react';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';

import { AppSiteInfo } from '../../../constants/appConstantSettings';

export default () => {
  return (
    <Box display="flex">
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
  );
};

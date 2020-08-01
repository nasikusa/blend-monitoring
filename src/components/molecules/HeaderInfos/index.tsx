import React from 'react';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

export default () => {
  return (
    <div>
      <Link
        href="https://github.com/nasikusa/blend-monitoring"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton aria-label="github" size="small">
          <GitHubIcon fontSize="small" />
        </IconButton>
      </Link>
      <Link
        href="https://twitter.com/nakanasinokusa"
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconButton aria-label="twitter" size="small">
          <TwitterIcon fontSize="small" />
        </IconButton>
      </Link>
    </div>
  );
};

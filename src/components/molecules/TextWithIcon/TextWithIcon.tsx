import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import { css } from '@emotion/core';

type Props = {
  iconElement: React.ReactElement;
  children: React.ReactNode;
};

const TextWithIcon: React.FC<Props> = (props) => {
  const theme = useTheme();
  const { iconElement, children } = props;
  return (
    <Box mx={2} display="flex" alignItems="center">
      {iconElement}
      <Typography
        variant="overline"
        css={css`
          margin-left: ${theme.spacing(1)}px;
        `}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default TextWithIcon;

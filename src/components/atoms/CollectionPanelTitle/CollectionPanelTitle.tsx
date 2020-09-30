/* eslint no-nested-ternary: 0 */
import React from 'react';
import { css } from '@emotion/core';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

/* eslint-disable import/no-unresolved */
import { baseSizeNamesType } from 'types/Size';
/* eslint-enable import/no-unresolved */

export type Props = {
  beforeIcon?: React.ReactElement;
  afterIcon?: React.ReactElement;
  fontSize?: baseSizeNamesType;
  children: React.ReactText;
} & TypographyProps;

const styles = {
  fontSizeSmall: css({
    fontSize: '12px',
  }),
  fontSizeMedium: css({
    fontSize: '16px',
  }),
  fontSizeLarge: css({
    fontSize: '20px',
  }),
};

const CollectionPanelTitle: React.FC<Props> = (props: Props) => {
  const {
    beforeIcon,
    afterIcon,
    fontSize = 'small',
    children = 'コレクションパネルタイトル',
    ...typographyProps
  } = props;

  return (
    <Box display="flex" my={2}>
      {beforeIcon && <Box mr={2}>{beforeIcon}</Box>}
      <Box>
        <Typography
          gutterBottom
          css={
            fontSize === 'small'
              ? styles.fontSizeSmall
              : fontSize === 'medium'
              ? styles.fontSizeMedium
              : fontSize === 'large'
              ? styles.fontSizeLarge
              : styles.fontSizeSmall
          }
          {...typographyProps}
        >
          {children}
        </Typography>
      </Box>
      {afterIcon && <Box mr={2}>{afterIcon}</Box>}
    </Box>
  );
};

export default CollectionPanelTitle;

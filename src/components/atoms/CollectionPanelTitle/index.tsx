/* eslint no-nested-ternary: 0 */
import React from 'react';
import { css } from '@emotion/core';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { baseSizeNamesType } from '../../../types/Size';

type Props = {
  beforeIcon?: React.ReactElement;
  afterIcon?: React.ReactElement;
  fontSize?: baseSizeNamesType;
  children: React.ReactText;
} & TypographyProps;

const CollectionPanelTitle: React.FC<Props> = (props: Props) => {
  const {
    beforeIcon,
    afterIcon,
    fontSize,
    children,
    ...typographyProps
  } = props;

  const styles = {
    title: css`
      font-size: ${fontSize === 'large'
        ? 20
        : fontSize === 'medium'
        ? 16
        : fontSize === 'small'
        ? 12
        : 16}px;
    `,
  };

  return (
    <Box display="flex" my={2}>
      <Box mr={2}>{beforeIcon}</Box>
      <Box>
        <Typography gutterBottom css={styles.title} {...typographyProps}>
          {children}
        </Typography>
      </Box>
      <Box mr={2}>{afterIcon}</Box>
    </Box>
  );
};

CollectionPanelTitle.defaultProps = {
  fontSize: 'small',
  children: 'コレクションパネルタイトル',
};

export default CollectionPanelTitle;

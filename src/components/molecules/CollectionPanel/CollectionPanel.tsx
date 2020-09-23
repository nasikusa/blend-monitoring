import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import { useTheme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { css } from '@emotion/core';

type Props = {
  children: React.ReactElement;
  collapseIn?: boolean;
};

const CollectionPanel = (props: Props) => {
  const { children, collapseIn } = props;
  const theme = useTheme();

  const styles = {
    wrapperListItemStyle: css`
      background-color: ${theme.palette.background.paper};
      padding-left: ${theme.spacing(2)}px;
      padding-right: ${theme.spacing(2)}px;
      padding-top: 0px;
      padding-bottom: 0px;
      cursor: default;
    `,
    fullWidthStyle: css`
      width: 100%;
    `,
  };

  return (
    <ListItem disableGutters css={styles.wrapperListItemStyle}>
      <Collapse css={styles.fullWidthStyle} in={collapseIn} timeout="auto">
        <Box width={1} mb={2}>
          {children}
        </Box>
        <Divider />
      </Collapse>
    </ListItem>
  );
};

CollectionPanel.defaultProps = {
  collapseIn: true,
};

export default CollectionPanel;

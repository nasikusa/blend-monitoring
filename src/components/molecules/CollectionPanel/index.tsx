import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useTheme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { css } from '@emotion/core';

type Props = {
  children: React.ReactElement;
  collapseIn: any;
};

const CollectionPanel = (props: Props) => {
  const { children, collapseIn } = props;
  const theme = useTheme();

  const styles = {
    innerListItem: css`
      padding-left: ${theme.spacing(6)};
      background-color: transparent;
      &:hover {
        background-color: transparent;
      }
      cursor: default;
    `,
    wrapperListItemStyle: css`
      background-color: ${theme.palette.background.paper};
      padding-top: 0px;
      padding-bottom: 0px;
    `,
    fullWidthStyle: css`
      width: 100%;
    `,
  };

  return (
    <ListItem disableGutters css={styles.wrapperListItemStyle}>
      {collapseIn != null ? (
        <Collapse css={styles.fullWidthStyle} in={collapseIn} timeout="auto">
          <List css={styles.fullWidthStyle} disablePadding>
            <ListItem button css={styles.innerListItem} disableRipple>
              <Box width={1}>{children}</Box>
            </ListItem>
          </List>
          <Divider />
        </Collapse>
      ) : (
        <List css={styles.fullWidthStyle} disablePadding>
          <ListItem button css={styles.innerListItem} disableRipple>
            <Box width={1}>{children}</Box>
          </ListItem>
        </List>
      )}
    </ListItem>
  );
};

export default CollectionPanel;

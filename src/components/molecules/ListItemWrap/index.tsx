import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { useTheme } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import { css } from '@emotion/core';

type Props = {
  children: React.ReactElement;
  collapseIn?: any;
};

const ListItemWrap = (props: Props) => {
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

  const InnerListElement = () => {
    return (
      <List css={styles.fullWidthStyle} disablePadding>
        <ListItem button css={styles.innerListItem} disableRipple>
          {children}
        </ListItem>
      </List>
    );
  };

  return (
    <ListItem disableGutters css={styles.wrapperListItemStyle}>
      {collapseIn != null ? (
        <Collapse css={styles.fullWidthStyle} in={collapseIn} timeout="auto">
          <InnerListElement />
          <Divider />
        </Collapse>
      ) : (
        <InnerListElement />
      )}
    </ListItem>
  );
};

export default ListItemWrap;

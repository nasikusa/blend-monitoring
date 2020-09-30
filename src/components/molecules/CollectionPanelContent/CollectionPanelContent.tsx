import React from 'react';
import Box from '@material-ui/core/Box';

type Props = {
  children: React.ReactNode;
};

const CollectionPanelContent: React.FC<Props> = (props) => {
  const { children } = props;
  return <Box ml={4}>{children}</Box>;
};

export default CollectionPanelContent;

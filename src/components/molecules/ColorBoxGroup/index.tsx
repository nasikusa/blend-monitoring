import React from 'react';
import Box from '@material-ui/core/Box';

type Props = {
  children: React.ReactNode;
};

const ColorBoxGroup: React.FC<Props> = (props) => {
  const { children } = props;
  return <Box display="flex">{children}</Box>;
};

export default ColorBoxGroup;

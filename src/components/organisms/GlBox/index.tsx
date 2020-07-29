import React from 'react';
import Box from '@material-ui/core/Box';
import GlItem from '../../molecules/GlItem';

const items = () => {
  const itemsArray = [];
  for (let i = 0; i < 5; i += 1) {
    itemsArray.push(<GlItem key={i} itemKey={i} />);
  }
  return itemsArray;
};

export default function () {
  return (
    <Box display="flex" flexWrap="wrap">
      {items()}
    </Box>
  );
}

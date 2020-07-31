import React, { createContext } from 'react';
import Box from '@material-ui/core/Box';
import GlItem from '../../molecules/GlItem';

export const GlItemOrderContext = createContext(0);

export type Props = {
  glItemCount: number;
};

const items = (glItemCount: Props['glItemCount']) => {
  const itemsArray = [];
  for (let i = 0; i < glItemCount; i += 1) {
    itemsArray.push(
      <GlItemOrderContext.Provider value={i}>
        <GlItem itemKey={i} />
      </GlItemOrderContext.Provider>
    );
  }
  return itemsArray;
};

export default function (props: Props) {
  const { glItemCount } = props;
  return (
    <Box display="flex" flexWrap="wrap">
      {items(glItemCount)}
    </Box>
  );
}

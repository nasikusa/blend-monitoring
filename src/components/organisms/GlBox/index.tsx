import React, { createContext } from 'react';
import Box from '@material-ui/core/Box';
import GlItem from '../../molecules/GlItem';

import { GlCollectionInterface } from '../../../stores/collectionData';
import { maxCountOfGlItem } from '../../../constants/appConstantSettings';

export const GlItemOrderContext = createContext(0);

export type Props = {
  glItemCount: number;
  glItemKeys: GlCollectionInterface['innerItemId'];
};

const items = (
  glItemCount: Props['glItemCount'],
  glItemKeys: Props['glItemKeys']
) => {
  const itemsArray = [];
  for (let i = 0; i < glItemCount; i += 1) {
    itemsArray.push(
      <GlItemOrderContext.Provider
        key={Array.isArray(glItemKeys) ? glItemKeys[i] : glItemKeys}
        value={i}
      >
        <GlItem />
      </GlItemOrderContext.Provider>
    );
  }
  return itemsArray;
};

export default function (props: Props) {
  const { glItemCount, glItemKeys } = props;

  /**
   * 最大のglItem数を考慮した表示されるアイテム数
   */
  let resultGlItemCountValue = glItemCount;
  if (resultGlItemCountValue >= maxCountOfGlItem) {
    resultGlItemCountValue = maxCountOfGlItem;
  }

  return (
    <Box display="flex" flexWrap="wrap">
      {items(resultGlItemCountValue, glItemKeys)}
    </Box>
  );
}

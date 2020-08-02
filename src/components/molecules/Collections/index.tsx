import React, { createContext } from 'react';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Divider from '@material-ui/core/Divider';
import CollectionContainer from '../../../container/CollectionContainer';

import {
  GlCollectionInterfaceArray,
  GlCollectionInterface,
} from '../../../stores/collectionData';

export type Props = {
  collectionData: GlCollectionInterfaceArray;
};

export const GlCollectionOrderContext = createContext(0);

export default (props: Props) => {
  const { collectionData } = props;

  /**
   * コレクションの配列。操作上の理由から最後に反転させていることに注意してください。
   */
  const collectionItems = collectionData
    .map((collectionDataItem: GlCollectionInterface, currentIndex: number) => {
      return (
        <GlCollectionOrderContext.Provider
          key={collectionDataItem.id}
          value={currentIndex}
        >
          <CollectionContainer />
        </GlCollectionOrderContext.Provider>
      );
    })
    .reverse();

  return (
    <div>
      <List>
        <Divider />
        <ListSubheader component="div">レイヤー</ListSubheader>
        {collectionItems}
      </List>
    </div>
  );
};

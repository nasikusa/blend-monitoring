import React, { createContext } from 'react';
import { css } from '@emotion/core';
import List from '@material-ui/core/List';
import CollectionContainer from '../../../container/CollectionContainer';

import {
  GlCollectionInterfaceArray,
  GlCollectionInterface,
} from '../../../stores/collectionData';

export type Props = {
  collectionData: GlCollectionInterfaceArray;
  editPanelUpperMargin: string;
};

export const GlCollectionOrderContext = createContext(0);

export default (props: Props) => {
  const { collectionData, editPanelUpperMargin } = props;

  const scrollStyle = css`
    overflow-y: scroll;
    height: calc(100vh - ${editPanelUpperMargin});
  `;

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
    <div css={scrollStyle}>
      <List>{collectionItems}</List>
    </div>
  );
};

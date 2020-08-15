import React, { createContext } from 'react';
import { css } from '@emotion/core';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CollectionContainer from '../../../container/CollectionContainer';

import {
  GlCollectionTypeArray,
  GlCollectionType,
} from '../../../stores/collectionData';
import CreateCollectionPanelContainer from '../../../container/CreateCollectionPanelContainer';

export type Props = {
  collectionData: GlCollectionTypeArray;
  editPanelUpperMargin: string;
};

/**
 * 現在のコレクションの順番を決定するためのcontextの型
 */
export type GlCollectionOrderContextType = number;

export const GlCollectionOrderContext = createContext<
  GlCollectionOrderContextType
>(0);

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
    .map((collectionDataItem: GlCollectionType, currentIndex: number) => {
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
    <Box>
      <CreateCollectionPanelContainer />
      <Divider />
      <Box css={scrollStyle}>
        <List>{collectionItems}</List>
      </Box>
    </Box>
  );
};

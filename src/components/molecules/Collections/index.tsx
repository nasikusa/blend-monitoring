import React, { createContext, useRef } from 'react';
import { css } from '@emotion/core';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CollectionContainer from '../../../container/CollectionContainer';

import {
  GlCollectionTypeArray,
  GlCollectionType,
} from '../../../types/collection/collectionData';
import CreateCollectionPanelContainer from '../../../container/CreateCollectionPanelContainer';

export type Props = {
  collectionData: GlCollectionTypeArray;
  calcedOtherAreaHeight: string;
};

/**
 * 現在のコレクションの順番を決定するためのcontextの型
 */
export type GlCollectionOrderContextType = number;

/**
 * 現在のコレクションの順番を判別するためのcontext
 */
export const GlCollectionOrderContext = createContext<
  GlCollectionOrderContextType
>(0);

export default (props: Props) => {
  const { collectionData, calcedOtherAreaHeight } = props;
  const collectionFixedMenuRef = useRef();

  const scrollStyle = css`
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - ${calcedOtherAreaHeight});
  `;

  return (
    <Box>
      <CreateCollectionPanelContainer ref={collectionFixedMenuRef} />
      <Divider />
      <Box css={scrollStyle}>
        <List>
          {collectionData
            .map(
              (collectionDataItem: GlCollectionType, currentIndex: number) => {
                return (
                  <GlCollectionOrderContext.Provider
                    key={collectionDataItem.id}
                    value={currentIndex}
                  >
                    <CollectionContainer />
                  </GlCollectionOrderContext.Provider>
                );
              }
            )
            .reverse()}
        </List>
      </Box>
    </Box>
  );
};

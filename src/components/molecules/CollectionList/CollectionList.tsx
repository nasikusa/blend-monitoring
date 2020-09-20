import React, { createContext, useRef } from 'react';
import { css } from '@emotion/core';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import CollectionContainer from '../../../container/CollectionContainer';

import CreateCollectionPanelContainer from '../../../container/CreateCollectionPanelContainer';
import { sceneCollectionsType } from '../../../stores/collection/sceneCollection';
import { ArrayElement } from '../../../types/utils/ArrayElement';

export type Props = {
  calcedOtherAreaHeight: string;
  currentCollectionsId: sceneCollectionsType;
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
export const CollectionIdContext = createContext<{
  collectionId: ArrayElement<sceneCollectionsType>;
  collectionOrder: GlCollectionOrderContextType;
}>({
  collectionId: '',
  collectionOrder: -1,
});

export default (props: Props) => {
  const { calcedOtherAreaHeight, currentCollectionsId } = props;
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
          {currentCollectionsId
            .map(
              (
                currentCollectionId: ArrayElement<sceneCollectionsType>,
                currentIndex: number
              ) => {
                return (
                  <CollectionIdContext.Provider
                    value={{
                      collectionId: currentCollectionId,
                      collectionOrder: currentIndex,
                    }}
                    key={currentCollectionId}
                  >
                    {/* // @deprecated */}
                    <GlCollectionOrderContext.Provider value={currentIndex}>
                      <CollectionContainer collectionId={currentCollectionId} />
                    </GlCollectionOrderContext.Provider>
                  </CollectionIdContext.Provider>
                );
              }
            )
            .reverse()}
        </List>
      </Box>
    </Box>
  );
};

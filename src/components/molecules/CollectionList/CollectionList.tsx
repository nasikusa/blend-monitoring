import React from 'react';
import { css } from '@emotion/core';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

/* eslint-disable import/no-unresolved */
import CollectionIdContext from 'contexts/CollectionIdContext';
/* eslint-enable import/no-unresolved */
import CollectionContainer from '../../../container/CollectionContainer';
import CreateCollectionPanelContainer from '../../../container/CreateCollectionPanelContainer';
import { SceneCollectionsType } from '../../../stores/collection/sceneCollection';
import { ArrayElement } from '../../../types/utils/ArrayElement';

export type Props = {
  calcedOtherAreaHeight: string;
  currentCollectionsId: SceneCollectionsType;
};

// /**
//  * 現在のコレクションの順番を決定するためのcontextの型
//  */
// export type GlCollectionOrderContextType = number;

// export const CollectionIdContext = createContext<{
//   collectionId: ArrayElement<SceneCollectionsType>;
//   collectionOrder: GlCollectionOrderContextType;
// }>({
//   collectionId: '',
//   collectionOrder: -1,
// });

const CollectionList: React.FC<Props> = (props) => {
  const { calcedOtherAreaHeight, currentCollectionsId } = props;

  const scrollStyle = css`
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100vh - ${calcedOtherAreaHeight});
  `;

  return (
    <Box>
      <CreateCollectionPanelContainer />
      <Divider />
      <Box css={scrollStyle}>
        <List>
          {currentCollectionsId
            .map(
              (
                currentCollectionId: ArrayElement<SceneCollectionsType>,
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
                    <CollectionContainer collectionId={currentCollectionId} />
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

export default CollectionList;

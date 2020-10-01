import React from 'react';
import { css } from '@emotion/core';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

/* eslint-disable import/no-unresolved */
import CollectionContainer from 'containers/CollectionContainer';
import CreateCollectionPanelContainer from 'containers/CreateCollectionPanelContainer';
import { SceneCollectionsType } from 'stores/collection/sceneCollection';
import { ArrayElement } from 'types/utils/ArrayElement';
/* eslint-enable import/no-unresolved */

export type Props = {
  calcedOtherAreaHeight: string;
  currentCollectionsId: SceneCollectionsType;
};

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
                  <CollectionContainer
                    key={currentCollectionId}
                    collectionOrder={currentIndex}
                    collectionId={currentCollectionId}
                  />
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

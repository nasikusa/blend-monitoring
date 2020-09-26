import React from 'react';
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
            .map((currentCollectionId: ArrayElement<sceneCollectionsType>) => {
              return (
                <CollectionContainer
                  key={currentCollectionId}
                  collectionId={currentCollectionId}
                />
              );
            })
            .reverse()}
        </List>
      </Box>
    </Box>
  );
};

export default CollectionList;

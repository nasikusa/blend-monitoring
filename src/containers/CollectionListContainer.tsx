import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';

/* eslint-disable import/no-unresolved */
import { AppState } from 'stores/index';
import CollectionList from 'components/molecules/CollectionList';
/* eslint-enable import/no-unresolved */

const CollectionListContainer = () => {
  const currentSceneCollectionId = useSelector(
    (state: AppState) => state.currentSceneCollection.currentId
  );
  const currentCollectionsId = useSelector(
    (state: AppState) =>
      state.sceneCollection[currentSceneCollectionId].innerCollectionId
  );
  const themeSettings = useSelector(
    (state: AppState) => state.themeSettings,
    shallowEqual
  );

  const calcedOtherAreaHeight = `${
    Number(themeSettings.header.appBarHeight.slice(0, -2)) +
    Number(themeSettings.footer.appBarHeight.slice(0, -2)) +
    Number(themeSettings.glEdit.tabButtonHeight.slice(0, -2)) +
    Number(themeSettings.glEdit.createButtonHeight.slice(0, -2))
  }px`;

  const combineProps = {
    calcedOtherAreaHeight,
    currentCollectionsId,
  };

  return <CollectionList {...combineProps} />;
};

export default CollectionListContainer;

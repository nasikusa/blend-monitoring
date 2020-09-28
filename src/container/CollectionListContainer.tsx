import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import CollectionList from '../components/molecules/CollectionList';
import { AppState } from '../stores/index';

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

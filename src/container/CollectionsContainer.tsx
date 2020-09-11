import React from 'react';
import { useSelector } from 'react-redux';
import Collections from '../components/molecules/CollectionList';
import { AppState } from '../stores/index';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';

export default () => {
  const collectionData = useCurrentSceneCollection();
  const currentSceneCollectionId = useSelector(
    (state: AppState) => state.currentSceneCollection.currentId
  );
  const currentCollectionsId = useSelector(
    (state: AppState) =>
      state.sceneCollection[currentSceneCollectionId].innerCollectionId
  );
  const themeSettings = useSelector((state: AppState) => state.themeSettings);

  const calcedOtherAreaHeight = `${
    Number(themeSettings.header.appBarHeight.slice(0, -2)) +
    Number(themeSettings.footer.appBarHeight.slice(0, -2)) +
    Number(themeSettings.glEdit.tabButtonHeight.slice(0, -2)) +
    Number(themeSettings.glEdit.createButtonHeight.slice(0, -2))
  }px`;

  const combineProps = {
    collectionData,
    calcedOtherAreaHeight,
    currentCollectionsId,
  };

  return <Collections {...combineProps} />;
};

import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import Footer from '../components/organisms/Footer';
import { AppState } from '../stores/index';
import getLengthOfCollections from '../utils/collection/getLengthOfCollections';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';

/**
 * フッターコンポーネントのcontainer
 */
export default () => {
  // const collectionData = useSelector((state: AppState) => state.collectionData);
  const collectionData = useCurrentSceneCollection();
  const storedMediaData = useSelector(
    (state: AppState) => state.storedMedia,
    shallowEqual
  );
  const multiCollectionsLength = collectionData.length;
  const storedMediaLength = Object.keys(storedMediaData).length;
  const glViewItemLength = getLengthOfCollections(collectionData);
  const combineProps = {
    multiCollectionsLength,
    glViewItemLength,
    storedMediaLength,
  };

  return <Footer {...combineProps} />;
};

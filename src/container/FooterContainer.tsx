import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../components/organisms/Footer';
import { AppState } from '../stores/index';
import getLengthOfCollections from '../utils/getLengthOfCollections';

/**
 * フッターコンポーネントのcontainer
 */
export default () => {
  const collectionData = useSelector((state: AppState) => state.collectionData);
  const multiCollectionsLength = collectionData.length;
  const glViewItemLength = getLengthOfCollections(collectionData);
  const combineProps = { multiCollectionsLength, glViewItemLength };

  return <Footer {...combineProps} />;
};

import React from 'react';
import { useSelector } from 'react-redux';
import DrawBox from '../components/organisms/DrawBox';
import getLengthOfCollections from '../utils/collection/getLengthOfCollections';
import getMaxLengthInnerItemId from '../utils/collection/getMaxLengthInnerItemId';
import { AppState } from '../stores/index';
import useCurrentSceneCollection from '../hooks/collection/useCurrentSceneCollection';

export default () => {
  const collectionData = useCurrentSceneCollection();
  const glSettingsData = useSelector((state: AppState) => state.glSettings);
  /**
   * コレクションリストのなかで最大の要素数の配列のlengthを格納している変数
   */
  let glItemCountValue = getLengthOfCollections(collectionData, 'max');
  const glMinItemCountValue = getLengthOfCollections(collectionData, 'min');
  if (glMinItemCountValue === 0) {
    glItemCountValue = 0;
  }

  const glItemKeys = getMaxLengthInnerItemId(collectionData);

  const glBoxRowCount = glSettingsData.rowCount;

  const combineProps = {
    ...{ glItemCount: glItemCountValue, glItemKeys, glBoxRowCount },
  };

  return <DrawBox {...combineProps} />;
};

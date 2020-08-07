import React from 'react';
import { useSelector } from 'react-redux';
import GlBox from '../components/organisms/GlBox';
import getLengthOfCollections from '../utils/getLengthOfCollections';
import getMaxLengthInnerItemId from '../utils/getMaxLengthInnerItemId';
import { AppState } from '../stores/index';

export default () => {
  const collectionData = useSelector((state: AppState) => state.collectionData);
  const glSettingsData = useSelector((state: AppState) => state.glSettings);
  /**
   * コレクションリストのなかで最大の要素数の配列のlengthを格納している変数
   */
  const glItemCountValue = getLengthOfCollections(collectionData, 'max');

  const glItemKeys = getMaxLengthInnerItemId(collectionData);

  const glBoxRowCount = glSettingsData.rowCount;

  const combineProps = {
    ...{ glItemCount: glItemCountValue, glItemKeys, glBoxRowCount },
  };

  return <GlBox {...combineProps} />;
};

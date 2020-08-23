import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import GlItem from '../components/molecules/GlItem';
import { AppState } from '../stores/index';
import hasMultiItemCollection from '../utils/hasMultiItemCollection';
import { GlItemOrderContext } from '../components/organisms/GlBox';
import { CollectionTypeType } from '../stores/collectionData';
import { StoredMediaStateItemType } from '../stores/storedMedia';

export default () => {
  const glItemOrder = useContext(GlItemOrderContext);
  const collectionData = useSelector((state: AppState) => state.collectionData);
  const storedMediaData = useSelector((state: AppState) => state.storedMedia);
  const [
    hasMultiItemCollectionBoolean,
    hasMultiItemCollectionData,
  ] = hasMultiItemCollection(collectionData);
  let typeSpecialValue: string | StoredMediaStateItemType | null = null;
  let multiItemCollectionType: CollectionTypeType | null = null;
  if (
    hasMultiItemCollectionBoolean === true &&
    hasMultiItemCollectionData != null
  ) {
    const multiItemSpecialValue = (() => {
      switch (hasMultiItemCollectionData.type) {
        case 'multiColors':
          return hasMultiItemCollectionData.color[glItemOrder];
        case 'multiImages': {
          const resultID = hasMultiItemCollectionData.image[glItemOrder];
          return storedMediaData[resultID];
        }
        case 'singleImageMultiBlends':
        case 'singleColorMultiBlends':
          return hasMultiItemCollectionData.blendMode[glItemOrder];
        default:
          return null;
      }
    })();
    typeSpecialValue = multiItemSpecialValue && multiItemSpecialValue;
    multiItemCollectionType = hasMultiItemCollectionData.type;
  }

  const combineProps = {
    typeSpecialValue,
    hasMultiItemCollectionBoolean,
    multiItemCollectionType,
  };

  return <GlItem {...combineProps} />;
};

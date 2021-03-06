import React, { useContext } from 'react';
import { useSelector, shallowEqual } from 'react-redux';

/* eslint-disable import/no-unresolved */
import DrawItem from 'components/molecules/DrawItem';
import { AppState } from 'stores/index';
import hasMultiItemCollection from 'utils/collection/hasMultiItemCollection';
import { GlItemOrderContext } from 'components/organisms/DrawBox/GlItemOrderContextElement';
import { CollectionTypeType } from 'types/collection/collectionData';
import { StoredMediaStateItemType } from 'stores/image/storedMedia';
import useCurrentSceneCollection from 'hooks/collection/useCurrentSceneCollection';
/* eslint-enable import/no-unresolved */

const DrawItemContainer: React.FC = () => {
  const glItemOrder = useContext(GlItemOrderContext);
  // const collectionData = useSelector((state: AppState) => state.collectionData);
  const collectionData = useCurrentSceneCollection();

  const storedMediaData = useSelector(
    (state: AppState) => state.storedMedia,
    shallowEqual
  );
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

  return <DrawItem {...combineProps} />;
};

export default DrawItemContainer;

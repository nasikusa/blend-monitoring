import React from 'react';
import { batch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import { css } from '@emotion/core';

import CustomIconButton from '../CustomIconButton';
import Icon from '../../atoms/Icon';
import collectionTypesArray from '../../../constants/collection/collectionTypesArray';
import collectionTypeNameObject from '../../../constants/collection/collectionTypeNameObject';
import canMultiItemCollectionName from '../../../constants/collection/canMultiItemCollectionName';
import { presetCollectionValueType } from '../../../stores/collection/presetCollectionValue';
import { defaultImageMediaStoreDataId } from '../../../constants/image/defaultImageMediaStoreData';

import { addSceneCollectionInnerItem } from '../../../stores/collection/sceneCollection';
import { addCollection } from '../../../stores/collection/collection';
import { addItem } from '../../../stores/collection/collectionItem';
import { addValue as addCollectionBlendModeValue } from '../../../stores/collection/collectionValueBlendMode';
import { addValue as addCollectionOpacity } from '../../../stores/collection/collectionValueOpacity';
import { addValue as addCollectionVisibility } from '../../../stores/collection/collectionValueVisibility';
import { addValue as addCollectionColor } from '../../../stores/collection/collectionValueColor';
import { addValue as addCollectionImage } from '../../../stores/collection/collectionValueImage';

export type Props = {
  curerntSceneCollectionId: string;
  presetCollectionValue: presetCollectionValueType;
  hasMultiItemCollection: boolean;
  storeAddSceneCollectionInnerItem: typeof addSceneCollectionInnerItem;
  storeAddCollection: typeof addCollection;
  storeAddCollectionItem: typeof addItem;
  storeAddCollectionBlendModeValue: typeof addCollectionBlendModeValue;
  storeAddCollectionOpacityValue: typeof addCollectionOpacity;
  storeAddCollectionVisibilityValue: typeof addCollectionVisibility;
  storeAddCollectionColorValue: typeof addCollectionColor;
  storeAddCollectionImageValue: typeof addCollectionImage;
};

/**
 * レイヤー / コレクションを追加するメニューのコンポーネント
 */
const CreateCollectionPanel = (props: Props) => {
  const {
    curerntSceneCollectionId,
    hasMultiItemCollection,
    storeAddSceneCollectionInnerItem,
    storeAddCollection,
    storeAddCollectionItem,
    storeAddCollectionBlendModeValue,
    storeAddCollectionOpacityValue,
    storeAddCollectionVisibilityValue,
    storeAddCollectionColorValue,
    storeAddCollectionImageValue,
  } = props;
  const theme = useTheme();

  /**
   * 新しく追加するコレクションオブジェクトを生成して、reduxに送信している関数
   * @param currentIndex
   */
  const handleChange = (currentIndex: number) => {
    const clickedTypeName = collectionTypesArray[currentIndex];

    const uuidObject = {
      collection: uuidv4(),
      collectionItem: uuidv4(),
      opacity: uuidv4(),
      blendMode: uuidv4(),
      visibility: uuidv4(),
      color: uuidv4(),
      image: uuidv4(),
    };

    batch(() => {
      // en: Added the required value for all base collection Items
      // ja: ベースとなるすべてのcollectionItemで必要になるvalueを追加
      storeAddCollectionOpacityValue({
        targetId: uuidObject.opacity,
        targetNewValue: 1,
      });
      storeAddCollectionBlendModeValue({
        targetId: uuidObject.blendMode,
        targetNewValue: 'normal',
      });
      storeAddCollectionVisibilityValue({
        targetId: uuidObject.visibility,
        targetNewValue: true,
      });

      /**
       * en: object with properties that are the basis of collectionItem
       * ja: collectionItemのベースとなるプロパティを持ったobject
       */
      const baseCollectionItemObject = {
        targetId: uuidObject.collectionItem,
        targetBlendModeId: uuidObject.blendMode,
        targetOpacityId: uuidObject.opacity,
        targetVisibilityId: uuidObject.visibility,
      };

      switch (clickedTypeName) {
        case 'singleImage':
        case 'singleImageMultiBlends':
        case 'multiImages':
          storeAddCollectionImageValue({
            targetId: uuidObject.image,
            targetIdNewValue: defaultImageMediaStoreDataId,
          });
          storeAddCollectionItem({
            ...baseCollectionItemObject,
            targetType: 'image',
            targetImageId: uuidObject.image,
          });
          break;
        case 'singleColor':
        case 'singleColorMultiBlends':
        case 'multiColors':
        case 'base':
          storeAddCollectionColorValue({
            targetId: uuidObject.color,
            targetNewValue: '#000000',
          });
          storeAddCollectionItem({
            ...baseCollectionItemObject,
            targetType: 'color',
            targetColorId: uuidObject.color,
          });
          break;
        default:
          throw new Error('not reachable collection type');
      }

      const baseCollectionObject = {
        id: uuidObject.collection,
        defaultVisibilityId: uuidObject.visibility,
        defaultOpacityId: uuidObject.opacity,
      };

      switch (clickedTypeName) {
        case 'singleColor':
          storeAddCollection({
            ...baseCollectionObject,
            type: 'singleColor',
            roughType: 'color',
            defaultBlendModeId: uuidObject.blendMode,
            defaultColorId: uuidObject.color,
            innerItemId: uuidObject.collectionItem,
          });
          break;
        case 'singleColorMultiBlends':
          storeAddCollection({
            ...baseCollectionObject,
            type: 'singleColorMultiBlends',
            roughType: 'color',
            defaultColorId: uuidObject.color,
            innerItemId: [uuidObject.collectionItem],
          });
          break;
        case 'multiColors':
          storeAddCollection({
            ...baseCollectionObject,
            type: 'multiColors',
            roughType: 'color',
            defaultBlendModeId: uuidObject.blendMode,
            innerItemId: [uuidObject.collectionItem],
          });
          break;
        case 'singleImage':
          storeAddCollection({
            ...baseCollectionObject,
            type: 'singleImage',
            roughType: 'image',
            defaultBlendModeId: uuidObject.blendMode,
            defaultImageId: uuidObject.image,
            innerItemId: uuidObject.collectionItem,
          });
          break;
        case 'singleImageMultiBlends':
          storeAddCollection({
            ...baseCollectionObject,
            type: 'singleImageMultiBlends',
            roughType: 'image',
            defaultImageId: uuidObject.image,
            innerItemId: [uuidObject.collectionItem],
          });
          break;
        case 'multiImages':
          storeAddCollection({
            ...baseCollectionObject,
            type: 'multiImages',
            roughType: 'image',
            defaultBlendModeId: uuidObject.blendMode,
            innerItemId: [uuidObject.collectionItem],
          });
          break;
        default:
          break;
      }

      storeAddSceneCollectionInnerItem({
        targetInnerItemId: uuidObject.collection,
        addIndexType: 'last',
        targetId: curerntSceneCollectionId,
      });
    });
  };

  return (
    <Box px={2} pb={1} pt={2}>
      <Box display="flex" alignItems="center">
        <Icon type="functionAddBlock" />
        <Typography
          gutterBottom
          css={css`
            margin-left: ${theme.spacing(2)}px;
          `}
        >
          レイヤー / コレクションを追加する
        </Typography>
      </Box>
      <Grid>
        {collectionTypesArray.map((singleCollectionType, currentIndex) => {
          return (
            <>
              <CustomIconButton
                type={singleCollectionType}
                buttonType="buttonWithIcon"
                labelTitle={collectionTypeNameObject[singleCollectionType].ja}
                active
                disableTooltip
                disable={
                  canMultiItemCollectionName.includes(singleCollectionType) &&
                  hasMultiItemCollection
                }
                buttonGeneralProps={{
                  onClick: () => {
                    if (
                      canMultiItemCollectionName.includes(
                        singleCollectionType
                      ) &&
                      hasMultiItemCollection
                    ) {
                      return;
                    }
                    handleChange(currentIndex);
                  },
                }}
                buttonProps={{
                  fullWidth: true,
                  variant: 'outlined',
                }}
              >
                {collectionTypeNameObject[singleCollectionType].ja}
              </CustomIconButton>
            </>
          );
        })}
      </Grid>
    </Box>
  );
};

export default CreateCollectionPanel;

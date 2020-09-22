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

export type Props = {
  curerntSceneCollectionId: string;
  presetCollectionValue: presetCollectionValueType;
  hasMultiItemCollection: boolean;
  storeAddSceneCollectionInnerItem: any;
  storeAddCollection: any;
  storeAddCollectionItem: any;
  storeAddCollectionBlendModeValue: any;
  storeAddCollectionOpacityValue: any;
  storeAddCollectionVisibilityValue: any;
  storeAddCollectionColorValue: any;
  storeAddCollectionImageValue: any;
};

/**
 * レイヤー / コレクションを追加するメニューのコンポーネント
 */
export default (props: Props) => {
  const {
    curerntSceneCollectionId,
    // hasMultiItemCollection,
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

    console.log('batch start');

    batch(() => {
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

      let collectionItemSubObject = {};

      switch (clickedTypeName) {
        case 'singleImage':
        case 'singleImageMultiBlends':
        case 'multiImages':
          storeAddCollectionImageValue({
            targetId: uuidObject.image,
            targetIdNewValue: '#000000',
          });
          collectionItemSubObject = {
            targetType: 'image',
            targetImageId: uuidObject.image,
          };
          break;
        case 'singleColor':
        case 'singleColorMultiBlends':
        case 'multiColors':
        case 'base':
          storeAddCollectionColorValue({
            targetId: uuidObject.color,
            targetNewValue: '#000000',
          });
          collectionItemSubObject = {
            targetType: 'color',
            targetColorId: uuidObject.color,
          };
          break;
        default:
          collectionItemSubObject = {};
          break;
      }

      storeAddCollectionItem({
        targetId: uuidObject.collectionItem,
        targetBlendModeId: uuidObject.blendMode,
        targetOpacityId: uuidObject.opacity,
        targetVisibilityId: uuidObject.visibility,
        ...collectionItemSubObject,
      });

      let collectionSubObject = {};

      switch (clickedTypeName) {
        case 'singleColor':
          collectionSubObject = {
            type: 'singleColor',
            roughType: 'color',
            defaultBlendModeId: uuidObject.blendMode,
            defaultColorId: uuidObject.color,
            innerItemId: uuidObject.collectionItem,
          };
          break;
        case 'singleColorMultiBlends':
          collectionSubObject = {
            type: 'singleColorMultiBlends',
            roughType: 'color',
            defaultBlendModeId: uuidObject.blendMode,
            innerItemId: [uuidObject.collectionItem],
          };
          break;
        case 'multiColors':
          collectionSubObject = {
            type: 'multiColors',
            roughType: 'color',
            defaultBlendModeId: uuidObject.blendMode,
            innerItemId: [uuidObject.collectionItem],
          };
          break;
        case 'singleImage':
          collectionSubObject = {
            type: 'singleImage',
            roughType: 'image',
            defaultBlendModeId: uuidObject.blendMode,
            defaultImageId: uuidObject.image,
            innerItemId: uuidObject.collectionItem,
          };
          break;
        case 'singleImageMultiBlends':
          collectionSubObject = {
            type: 'singleImageMultiBlends',
            roughType: 'image',
            defaultBlendModeId: uuidObject.blendMode,
            innerItemId: [uuidObject.collectionItem],
          };
          break;
        case 'multiImages':
          collectionSubObject = {
            type: 'multiImages',
            roughType: 'image',
            defaultBlendModeId: uuidObject.blendMode,
            innerItemId: [],
          };
          break;
        default:
          break;
      }

      storeAddCollection({
        id: uuidObject.collection,
        defaultVisibilityId: uuidObject.visibility,
        defaultOpacityId: uuidObject.opacity,
        ...collectionSubObject,
      });

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
                disable={canMultiItemCollectionName.includes(
                  singleCollectionType
                )}
                buttonGeneralProps={{
                  onClick: () => {
                    if (
                      canMultiItemCollectionName.includes(singleCollectionType)
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

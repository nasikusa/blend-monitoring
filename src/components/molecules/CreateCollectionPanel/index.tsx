import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import { css } from '@emotion/core';

import CustomIconButton from '../CustomIconButton';
import Icon from '../../atoms/Icon';
import collectionTypesArray from '../../../constants/collectionTypesArray';
import collectionTypeNameObject from '../../../constants/collectionTypeNameObject';
import canMultiItemCollectionName from '../../../constants/canMultiItemCollectionName';
import { presetCollectionValueType } from '../../../stores/presetCollectionValue';

export type Props = {
  createCollection: any;
  presetCollectionValue: presetCollectionValueType;
  hasMultiItemCollection: boolean;
};

/**
 * レイヤー / コレクションを追加するメニューのコンポーネント
 */
export default (props: Props) => {
  const {
    createCollection,
    hasMultiItemCollection,
    presetCollectionValue,
  } = props;
  const theme = useTheme();

  /**
   * 新しく追加するコレクションオブジェクトを生成して、reduxに送信している関数
   * @param currentIndex
   */
  const handleChange = (currentIndex: number) => {
    const clickedTypeName = collectionTypesArray[currentIndex];
    const baseCollectionObject = {
      type: clickedTypeName,
      id: uuidv4(),
      innerItemId: uuidv4(),
      visibility: true,
      opacity: 1.0,
      blendMode: 'normal',
      color: null,
      size: null,
      image: null,
    };
    let multipleCollectionObject = {};
    switch (clickedTypeName) {
      case 'singleColor':
        multipleCollectionObject = {
          roughType: 'color',
          color: '#000000',
          ...presetCollectionValue.singleColor,
        };
        break;
      case 'singleColorMultiBlends':
        multipleCollectionObject = {
          roughType: 'color',
          color: '#000000',
          blendMode: [],
          innerItemId: [],
          ...presetCollectionValue.singleColorMultiBlends,
        };
        break;
      case 'multiColors':
        multipleCollectionObject = {
          roughType: 'color',
          color: ['#000000'],
          innerItemId: [uuidv4()],
          ...presetCollectionValue.multiColors,
        };
        break;
      case 'singleImage':
        multipleCollectionObject = {
          roughType: 'image',
          image: null,
          blendMode: 'normal',
          innerItemId: [uuidv4()],
          size: 'cover',
          ...presetCollectionValue.singleImage,
        };
        break;
      case 'singleImageMultiBlends':
        multipleCollectionObject = {
          roughType: 'image',
          image: null,
          blendMode: [],
          innerItemId: [],
          size: 'cover',
          ...presetCollectionValue.singleImagesMultiBlends,
        };
        break;
      case 'multiImages':
        multipleCollectionObject = {
          roughType: 'image',
          image: [],
          innerItemId: [],
          size: 'cover',
          ...presetCollectionValue.multiImages,
        };
        break;
      default:
        break;
    }

    const resultNewCollectionObject = {
      ...baseCollectionObject,
      ...multipleCollectionObject,
    };

    createCollection({
      collectionDataObject: resultNewCollectionObject,
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

import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CustomIconButton from '../CustomIconButton';

import collectionTypesArray from '../../../constants/collectionTypesArray';
import collectionTypeNameObject from '../../../constants/collectionTypeNameObject';
import canMultiItemCollectionName from '../../../constants/canMultiItemCollectionName';

export type Props = {
  createCollection: any;
  hasMultiItemCollection: boolean;
};

/**
 * レイヤー / コレクションを追加するメニューのコンポーネント
 */
export default (props: Props) => {
  const { createCollection, hasMultiItemCollection } = props;

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
        };
        break;
      case 'singleColorMultiBlends':
        multipleCollectionObject = {
          roughType: 'color',
          color: '#000000',
          blendMode: ['normal'],
          innerItemId: [uuidv4()],
        };
        break;
      case 'multiColors':
        multipleCollectionObject = {
          roughType: 'color',
          color: ['#000000'],
          innerItemId: [uuidv4()],
        };
        break;
      case 'singleImage':
        multipleCollectionObject = {
          roughType: 'image',
          image: null,
          blendMode: 'normal',
          innerItemId: [uuidv4()],
          size: 'cover',
        };
        break;
      case 'singleImageMultiBlends':
        multipleCollectionObject = {
          roughType: 'image',
          image: null,
          blendMode: ['normal'],
          innerItemId: [uuidv4()],
          size: 'cover',
        };
        break;
      case 'multiImages':
        multipleCollectionObject = {
          roughType: 'image',
          image: [],
          innerItemId: [uuidv4()],
          size: 'cover',
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
      <Typography gutterBottom>レイヤー / コレクションを追加する</Typography>
      <Grid>
        {collectionTypesArray.map((singleCollectionType, currentIndex) => {
          return (
            <>
              <CustomIconButton
                type={singleCollectionType}
                buttonType="iconButton"
                labelTitle={collectionTypeNameObject[singleCollectionType].ja}
                active
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

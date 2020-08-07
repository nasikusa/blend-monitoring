import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CustomTooltip from '../../atoms/CustomTooltip';

import CollectionMainIcon from '../../atoms/CollectionMainIcon';
import collectionTypesArray from '../../../constants/collectionTypesArray';
import collectionTypeNameObject from '../../../constants/collectionTypeNameObject';
import canMultiItemCollectionName from '../../../constants/canMultiItemCollectionName';

/**
 * レイヤー / コレクションを追加するメニューのコンポーネント
 */
export default (props: any) => {
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
      imageWidth: null,
      imageHeight: null,
    };
    let multipleCollectionObject = {};
    switch (clickedTypeName) {
      case 'singleColor':
        multipleCollectionObject = {
          color: '#000000',
        };
        break;
      case 'singleColorMultiBlends':
        multipleCollectionObject = {
          color: '#000000',
          blendMode: ['normal'],
          innerItemId: [uuidv4()],
        };
        break;
      case 'multiColors':
        multipleCollectionObject = {
          color: ['#000000'],
          innerItemId: [uuidv4()],
        };
        break;
      case 'singleImageMultiBlends':
        multipleCollectionObject = {
          image: null,
          blendMode: ['normal'],
          innerItemId: [uuidv4()],
        };
        break;
      case 'multiImages':
        multipleCollectionObject = {
          image: null,
          innerItemId: [uuidv4()],
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
            <CustomTooltip
              enterDelay={750}
              title={collectionTypeNameObject[singleCollectionType].ja}
            >
              <IconButton
                onClick={() => {
                  if (
                    canMultiItemCollectionName.includes(singleCollectionType) &&
                    hasMultiItemCollection
                  ) {
                    return;
                  }
                  handleChange(currentIndex);
                }}
              >
                <CollectionMainIcon
                  collectionType={singleCollectionType}
                  iconProps={{
                    color:
                      canMultiItemCollectionName.includes(
                        singleCollectionType
                      ) && hasMultiItemCollection
                        ? 'disabled'
                        : 'secondary',
                  }}
                />
              </IconButton>
            </CustomTooltip>
          );
        })}
      </Grid>
    </Box>
  );
};

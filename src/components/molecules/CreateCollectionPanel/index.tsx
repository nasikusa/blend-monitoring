import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import CollectionMainIcon from '../../atoms/CollectionMainIcon';
import collectionTypesArray from '../../../constants/collectionTypesArray';
import collectionTypeNameObject from '../../../constants/collectionTypeNameObject';

/**
 * レイヤー / コレクションを追加するメニューのコンポーネント
 */
export default (props: any) => {
  const { createCollection } = props;

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
    <Box p={2}>
      <Typography gutterBottom>レイヤー / コレクションを追加</Typography>
      <Grid>
        {collectionTypesArray.map((singleCollectionType, currentIndex) => {
          return (
            <Tooltip title={collectionTypeNameObject[singleCollectionType].ja}>
              <IconButton
                onClick={() => {
                  handleChange(currentIndex);
                }}
              >
                <CollectionMainIcon
                  collectionType={singleCollectionType}
                  iconProps={{
                    color: 'secondary',
                  }}
                />
              </IconButton>
            </Tooltip>
          );
        })}
      </Grid>
    </Box>
  );
};
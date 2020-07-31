import React from 'react';

import ImageIcon from '@material-ui/icons/Image';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import BrushIcon from '@material-ui/icons/Brush';
import BarChartIcon from '@material-ui/icons/BarChart';
import HelpIcon from '@material-ui/icons/Help';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import { CollectionTypeType } from '../../../stores/collectionData';

interface PropsInterface {
  collectionType: CollectionTypeType;
}

/**
 * コレクションのタイプから、アイコン画像DOMを返却する関数
 */
export default (props: PropsInterface) => {
  const { collectionType } = props;
  switch (collectionType) {
    case 'singleImage':
      return <ImageIcon />;
    case 'singleImageMultiBlends':
      return <PhotoLibraryIcon />;
    case 'multiImages':
      return <PermMediaIcon />;
    case 'singleColor':
    case 'singleColorMultiBlends':
      return <ColorLensIcon />;
    case 'multiColors':
      return <BrushIcon />;
    case 'adjust':
      return <BarChartIcon />;
    default:
      return <HelpIcon />;
  }
};

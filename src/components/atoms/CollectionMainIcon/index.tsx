import React from 'react';

import ImageIcon from '@material-ui/icons/Image';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import BrushIcon from '@material-ui/icons/Brush';
import BarChartIcon from '@material-ui/icons/BarChart';
import HelpIcon from '@material-ui/icons/Help';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import FilterNoneIcon from '@material-ui/icons/FilterNone';

import { CollectionTypeType } from '../../../stores/collectionData';

interface PropsInterface {
  collectionType: CollectionTypeType;
  iconProps?: any;
}

/**
 * コレクションのタイプから、アイコン画像DOMを返却する関数
 */
export default (props: PropsInterface) => {
  const { collectionType, iconProps } = props;
  switch (collectionType) {
    case 'singleImage':
      return <ImageIcon {...iconProps} />;
    case 'singleImageMultiBlends':
      return <PhotoLibraryIcon {...iconProps} />;
    case 'multiImages':
      return <PermMediaIcon {...iconProps} />;
    case 'singleColor':
      return <BrushIcon {...iconProps} />;
    case 'singleColorMultiBlends':
      return <FilterNoneIcon {...iconProps} />;
    case 'multiColors':
      return <ColorLensIcon {...iconProps} />;
    case 'adjust':
      return <BarChartIcon {...iconProps} />;
    default:
      return <HelpIcon {...iconProps} />;
  }
};

import React from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';

// icon start =====================================
// default
import HelpIcon from '@material-ui/icons/Help';
// tabs
import ViewHeadlineIcon from '@material-ui/icons/ViewHeadline';
import SettingsIcon from '@material-ui/icons/Settings';
// CollectionTypeType
import ImageIcon from '@material-ui/icons/Image';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import CropDinIcon from '@material-ui/icons/CropDin';
import FilterNoneIcon from '@material-ui/icons/FilterNone';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import BarChartIcon from '@material-ui/icons/BarChart';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
// IgnoreDupliCollectionPanelNamesType
import OpacityIcon from '@material-ui/icons/Opacity';
import TextureIcon from '@material-ui/icons/Texture';
import LayersIcon from '@material-ui/icons/Layers';
// ColorPanelFunctionNames
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SortIcon from '@material-ui/icons/Sort';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
// BlendModeRoughTypeType
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import DialpadIcon from '@material-ui/icons/Dialpad';
// IconGeneralMeaningNames
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CachedIcon from '@material-ui/icons/Cached';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import BlockIcon from '@material-ui/icons/Block';
// IconBrandNames
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';

// icon end =======================================

import { CollectionTypeType } from '../../../stores/collectionData';
import { IgnoreDupliCollectionPanelNamesType } from '../../../types/CollectionPanelNames';
import { ColorPanelFunctionNames } from '../../molecules/ColorPanel';
import { BlendModeRoughTypeType } from '../../../constants/blendModeData';

export type IconGeneralMeaningNames =
  | 'functionAdd'
  | 'functionDelete'
  | 'functionReload'
  | 'functionClose'
  | 'functionUpload'
  | 'functionDownload'
  | 'functionOpacity'
  | 'functionExpandLess'
  | 'functionExpandMore'
  | 'functionInfo'
  | 'functionError'
  | 'functionWarning'
  | 'functionHelp'
  | 'functionZoomIn'
  | 'functionZoomOut'
  | 'functionZoomExpand';

export type IconBrandNames = 'iconTwitter' | 'iconFacebook' | 'iconGithub';

type Props = {
  type:
    | 'layer'
    | 'settings'
    | CollectionTypeType
    | IgnoreDupliCollectionPanelNamesType
    | ColorPanelFunctionNames
    | BlendModeRoughTypeType
    | IconGeneralMeaningNames
    | IconBrandNames;
} & SvgIconProps;

const Icon = (p: Props) => {
  const { type } = p;
  const IconElement = () => {
    switch (type) {
      // collection tabs
      case 'layer':
        return <ViewHeadlineIcon {...p} />;
      case 'settings':
        return <SettingsIcon {...p} />;
      // CollectionTypeType
      case 'singleImage':
        return <ImageIcon {...p} />;
      case 'singleImageMultiBlends':
        return <PhotoLibraryIcon {...p} />;
      case 'multiImages':
        return <PermMediaIcon {...p} />;
      case 'singleColor':
        return <CropDinIcon {...p} />;
      case 'singleColorMultiBlends':
        return <FilterNoneIcon {...p} />;
      case 'multiColors':
        return <ColorLensIcon {...p} />;
      case 'adjust':
        return <BarChartIcon {...p} />;
      case 'base':
        return <FiberManualRecordIcon {...p} />;
      case 'opacityPanel':
        return <OpacityIcon {...p} />;
      case 'imagePanel':
        return <TextureIcon {...p} />;
      case 'colorPanel':
        return <ColorLensIcon {...p} />;
      case 'blendModePanel':
        return <LayersIcon {...p} />;
      // ColorPanelFunctionNames
      case 'colorPanelAdd':
        return <AddBoxIcon {...p} />;
      case 'colorPanelDelete':
        return <DeleteIcon {...p} />;
      case 'colorPanelSort':
        return <SortIcon {...p} />;
      case 'colorPanelAddFav':
        return <StarIcon {...p} />;
      case 'colorPanelDeleteFav':
        return <StarBorderIcon {...p} />;
      case 'colorPanelFill':
        return <FormatColorFillIcon {...p} />;
      case 'colorPanelExpand':
        return <ZoomOutMapIcon {...p} />;
      // BlendModeRoughTypeType
      case 'blendModeNormal':
        return <PanoramaFishEyeIcon {...p} />;
      case 'blendModeBrightnessMinus':
        return <Brightness3Icon {...p} />;
      case 'blendModeBrightnessPlusMinus':
        return (
          <>
            <Brightness3Icon {...p} />
            <WbSunnyIcon {...p} />
          </>
        );
      case 'blendModeBrightnessPlus':
        return <WbSunnyIcon {...p} />;
      case 'blendModeMath':
        return <DialpadIcon {...p} />;
      // IconGeneralMeaningNames
      case 'functionAdd':
        return <AddIcon {...p} />;
      case 'functionClose':
        return <CloseIcon {...p} />;
      case 'functionDelete':
        return <DeleteIcon {...p} />;
      case 'functionDownload':
        return <GetAppIcon {...p} />;
      case 'functionUpload':
        return <PublishIcon {...p} />;
      case 'functionExpandLess':
        return <ExpandLess {...p} />;
      case 'functionExpandMore':
        return <ExpandMore {...p} />;
      case 'functionOpacity':
        return <OpacityIcon {...p} />;
      case 'functionReload':
        return <CachedIcon {...p} />;
      case 'functionInfo':
        return <InfoIcon {...p} />;
      case 'functionWarning':
        return <WarningIcon {...p} />;
      case 'functionError':
        return <BlockIcon {...p} />;
      case 'functionHelp':
        return <HelpIcon {...p} />;
      case 'functionZoomIn':
        return <ZoomInIcon {...p} />;
      case 'functionZoomOut':
        return <ZoomOutIcon {...p} />;
      case 'functionZoomExpand':
        return <ZoomOutMapIcon {...p} />;
      // IconBrandNames
      case 'iconTwitter':
        return <TwitterIcon {...p} />;
      case 'iconFacebook':
        return <FacebookIcon {...p} />;
      case 'iconGithub':
        return <GitHubIcon {...p} />;
      default:
        return <HelpIcon {...p} />;
    }
  };

  return (
    <>
      <IconElement />
    </>
  );
};

export default Icon;

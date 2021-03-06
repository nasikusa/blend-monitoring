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
import VisibilityIcon from '@material-ui/icons/Visibility';
import SaveIcon from '@material-ui/icons/Save';
import ScheduleIcon from '@material-ui/icons/Schedule';
import DescriptionIcon from '@material-ui/icons/Description';
// IconBrandNames
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';
// footerFunction
import BrushIcon from '@material-ui/icons/Brush';
import ShowChartIcon from '@material-ui/icons/ShowChart';

// icon end =======================================

/* eslint-disable import/no-unresolved */
import { CollectionTypeType } from 'types/collection/collectionData';
import { IgnoreDupliCollectionPanelNamesType } from 'types/CollectionPanelNames';
import { BlendModeRoughTypeType } from 'constants/blendMode/blendModeData';
/* eslint-enable import/no-unresolved */
import { ColorPanelFunctionNames } from '../../molecules/ColorPanel/ColorPanel';

/**
 * en: The name of the type of the icon of the universal name function used throughout the application
 * ja: アプリケーション内、全体で活用する普遍的な名前の機能のアイコンのtypeの名前
 */
export type IconGeneralMeaningNames =
  | 'functionAdd'
  | 'functionAddBlock'
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
  | 'functionZoomExpand'
  | 'functionVisibility'
  | 'functionSaveData'
  | 'functionImage'
  | 'functionPalette'
  | 'functionTime'
  | 'functionLicense';

/**
 * en: Icon name of other application
 * ja: 他アプリケーションのアイコン名
 */
type IconBrandNames = 'iconTwitter' | 'iconFacebook' | 'iconGithub';

type FooterFunctionNames = 'footerFunctionDraw' | 'footerFunctionVersion';

export type IconTypeTypes =
  | 'layer'
  | 'settings'
  | CollectionTypeType
  | IgnoreDupliCollectionPanelNamesType
  | ColorPanelFunctionNames
  | BlendModeRoughTypeType
  | IconGeneralMeaningNames
  | IconBrandNames
  | FooterFunctionNames;

type Props = {
  readonly type?: IconTypeTypes;
  readonly children?: never;
} & SvgIconProps;

const Icon: React.FC<Props> = (p) => {
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
      case 'functionAddBlock':
        return <AddBoxIcon {...p} />;
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
      case 'functionVisibility':
        return <VisibilityIcon {...p} />;
      case 'functionSaveData':
        return <SaveIcon {...p} />;
      case 'functionImage':
        return <ImageIcon {...p} />;
      case 'functionPalette':
        return <ColorLensIcon {...p} />;
      case 'functionTime':
        return <ScheduleIcon {...p} />;
      case 'functionLicense':
        return <DescriptionIcon {...p} />;
      // IconBrandNames
      case 'iconTwitter':
        return <TwitterIcon {...p} />;
      case 'iconFacebook':
        return <FacebookIcon {...p} />;
      case 'iconGithub':
        return <GitHubIcon {...p} />;
      // footerFunction
      case 'footerFunctionDraw':
        return <BrushIcon {...p} />;
      case 'footerFunctionVersion':
        return <ShowChartIcon {...p} />;
      default:
        return <HelpIcon {...p} />;
    }
  };

  return <IconElement />;
};

export default Icon;

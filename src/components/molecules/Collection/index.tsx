/* eslint no-nested-ternary: 0 */

import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Collapse from '@material-ui/core/Collapse';
import Tooltip from '@material-ui/core/Tooltip';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import OpacityIcon from '@material-ui/icons/Opacity';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DeleteIcon from '@material-ui/icons/Delete';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import TextureIcon from '@material-ui/icons/Texture';

import CustomSliderContainer from '../../../container/CustomSliderContainer';
import BlendModalContainer from '../../../container/BlendModalContainer';
import ColorPanelContainer from '../../../container/ColorPanelContainer';

import CollectionMainIcon from '../../atoms/CollectionMainIcon';
import GetCollectionsName from '../../../utils/GetCollectionsName';
import { GlCollectionOrderContext } from '../Collections';

import {
  GlCollectionInterfaceArray,
  CollectionTypeType,
} from '../../../stores/collectionData';

export type Props = {
  collectionData: GlCollectionInterfaceArray;
  deleteSingleCollection: any;
  updateVisibility: any;
};

export type collectionObjectFunctionType = {
  visibility: boolean;
  opacity: boolean;
  blendMode: boolean;
  color: boolean;
  image: boolean;
  garbage: boolean;
};

export type collectionTypeFunctionType = {
  [key in CollectionTypeType]: collectionObjectFunctionType;
};

/**
 * Material UIのスタイル
 */
const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: `transparent`,
    '&:hover': {
      backgroundColor: `transparent`,
    },
    cursor: `default`,
  },
  nested: {
    paddingLeft: theme.spacing(4),
    backgroundColor: `transparent`,
    '&:hover': {
      backgroundColor: `transparent`,
    },
    cursor: `default`,
  },
  collapse: {
    backgroundColor: `#484848`,
  },
}));

export const allCollectionTypeFunctionObject: collectionTypeFunctionType = {
  singleColor: {
    visibility: true,
    opacity: true,
    blendMode: true,
    color: true,
    image: false,
    garbage: true,
  },
  singleColorMultiBlends: {
    visibility: true,
    opacity: true,
    blendMode: true,
    color: true,
    image: false,
    garbage: true,
  },
  multiColors: {
    visibility: true,
    opacity: true,
    blendMode: true,
    color: true,
    image: false,
    garbage: true,
  },
  singleImage: {
    visibility: true,
    opacity: true,
    blendMode: true,
    color: false,
    image: true,
    garbage: true,
  },
  singleImageMultiBlends: {
    visibility: true,
    opacity: true,
    blendMode: true,
    color: false,
    image: true,
    garbage: true,
  },
  multiImages: {
    visibility: true,
    opacity: true,
    blendMode: true,
    color: false,
    image: true,
    garbage: true,
  },
  adjust: {
    visibility: true,
    opacity: true,
    blendMode: true,
    color: false,
    image: false,
    garbage: true,
  },
};

/**
 * 単一のコレクションコンポーネント
 */
export default (props: Props) => {
  const { collectionData, deleteSingleCollection, updateVisibility } = props;
  const classes = useStyles();
  const glCollectionOrderKey = useContext(GlCollectionOrderContext);

  /**
   * 現在使用しているコレクション
   */
  const singleCollectionData = collectionData[glCollectionOrderKey];

  /**
   * 現在使用しているコレクションのタイプ
   */
  const singleCollectionType: CollectionTypeType = singleCollectionData.type;

  /**
   * 現在使用している単一のcollectionの機能の可能、不可能についてのobject
   */
  const collectionTypeFunctionObject =
    allCollectionTypeFunctionObject[singleCollectionType];

  const secondaryIconSize = 'small';
  const secondaryIconButtonSize = 'small';
  /**
   * ツールチップの表示がされるまでのdelayタイム(ミリ秒)
   */
  const iconsTooltipEnterDelayTime = 1500;

  const [allOpenFlag, setAllOpenFlag] = useState(true);

  const [visibilityOpenFlag, setVisibilityOpenFlag] = useState(
    collectionTypeFunctionObject.visibility
  );
  const [opacityOpenFlag, setOpacityOpenFlag] = useState(
    collectionTypeFunctionObject.opacity
  );
  const [blendModeOpenFlag, setBlendModeOpenFlag] = useState(
    collectionTypeFunctionObject.blendMode
  );
  const [colorOpenFlag, setColorOpenFlag] = useState(
    collectionTypeFunctionObject.color
  );
  const [imageOpenFlag, setImageOpenFlag] = useState(
    collectionTypeFunctionObject.image
  );

  const openHasPanelNameArray: (keyof collectionObjectFunctionType)[] = [
    'opacity',
    'blendMode',
    'color',
    'image',
  ];

  /**
   * MaterialUIのCollapseコンポーネントの開閉stateを変更する関数
   */
  const handleExpandClick = (): void => {
    setAllOpenFlag(!allOpenFlag);
  };

  const handleExpandValueCheck = (): void => {
    if (
      openHasPanelNameArray.every((flagName) => {
        if (collectionTypeFunctionObject[flagName] === false) {
          // console.log(collectionTypeFunctionObject);
          return true;
        }
        switch (flagName) {
          case 'opacity':
            return opacityOpenFlag;
          case 'blendMode':
            return blendModeOpenFlag;
          case 'color':
            return colorOpenFlag;
          case 'image':
            return imageOpenFlag;
          default:
            return false;
        }
      })
    ) {
      setAllOpenFlag(true);
    }
  };

  const handleVisibilityFlagClick = (): void => {
    const invertBoolValue = !visibilityOpenFlag;
    setVisibilityOpenFlag(invertBoolValue);
    updateVisibility({
      visibilityBoolValue: invertBoolValue,
      glCollectionOrderKey,
    });
  };

  const handleOpacityFlagClick = (): void => {
    setOpacityOpenFlag(!opacityOpenFlag);
    handleExpandValueCheck();
  };

  const handleBlendModeFlagClick = (): void => {
    setBlendModeOpenFlag(!blendModeOpenFlag);
  };
  const handleColorFlagClick = (): void => {
    setColorOpenFlag(!colorOpenFlag);
  };
  const handleImageFlagClick = (): void => {
    setImageOpenFlag(!imageOpenFlag);
  };

  const handleDeleteIconClick = (): void => {
    deleteSingleCollection({
      deleteCollectionNumber: glCollectionOrderKey,
    });
  };

  /**
   * コレクションのアイコンメニュー部分のReact要素
   */
  const SecondaryAreaElement = (
    <>
      <Tooltip
        enterDelay={iconsTooltipEnterDelayTime}
        title="一時的に非表示にします"
      >
        <IconButton
          onClick={handleVisibilityFlagClick}
          size={secondaryIconButtonSize}
        >
          {visibilityOpenFlag ? (
            <VisibilityIcon
              color={
                collectionTypeFunctionObject.visibility
                  ? visibilityOpenFlag
                    ? 'secondary'
                    : 'inherit'
                  : 'disabled'
              }
              fontSize={secondaryIconSize}
            />
          ) : (
            <VisibilityOffIcon
              color={
                collectionTypeFunctionObject.visibility
                  ? visibilityOpenFlag
                    ? 'secondary'
                    : 'inherit'
                  : 'disabled'
              }
              fontSize={secondaryIconSize}
            />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip
        enterDelay={iconsTooltipEnterDelayTime}
        title="透過度パネルを開閉します"
      >
        <IconButton
          onClick={handleOpacityFlagClick}
          size={secondaryIconButtonSize}
        >
          <OpacityIcon
            color={
              collectionTypeFunctionObject.opacity
                ? opacityOpenFlag
                  ? 'secondary'
                  : 'inherit'
                : 'disabled'
            }
            fontSize={secondaryIconSize}
          />
        </IconButton>
      </Tooltip>
      <Tooltip
        enterDelay={iconsTooltipEnterDelayTime}
        title="描画モードパネルを開閉します"
      >
        <IconButton
          onClick={handleBlendModeFlagClick}
          size={secondaryIconButtonSize}
        >
          <PhotoLibraryIcon
            color={
              collectionTypeFunctionObject.blendMode
                ? blendModeOpenFlag
                  ? 'secondary'
                  : 'inherit'
                : 'disabled'
            }
            fontSize={secondaryIconSize}
          />
        </IconButton>
      </Tooltip>
      <Tooltip
        enterDelay={iconsTooltipEnterDelayTime}
        title="カラーパネルを開閉します"
      >
        <IconButton
          onClick={handleColorFlagClick}
          size={secondaryIconButtonSize}
        >
          <ColorLensIcon
            color={
              collectionTypeFunctionObject.color
                ? colorOpenFlag
                  ? 'secondary'
                  : 'inherit'
                : 'disabled'
            }
            fontSize={secondaryIconSize}
          />
        </IconButton>
      </Tooltip>
      <Tooltip
        enterDelay={iconsTooltipEnterDelayTime}
        title="画像パネルを開閉します"
      >
        <IconButton
          onClick={handleImageFlagClick}
          size={secondaryIconButtonSize}
        >
          <TextureIcon
            color={
              collectionTypeFunctionObject.image
                ? imageOpenFlag
                  ? 'secondary'
                  : 'inherit'
                : 'disabled'
            }
            fontSize={secondaryIconSize}
          />
        </IconButton>
      </Tooltip>
      <Tooltip
        enterDelay={iconsTooltipEnterDelayTime}
        title="レイヤー・コレクションを削除します"
      >
        <IconButton
          onClick={handleDeleteIconClick}
          size={secondaryIconButtonSize}
        >
          <DeleteIcon color="error" fontSize={secondaryIconSize} />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <>
      <ListItem button disableRipple className={classes.main}>
        <ListItemIcon>
          <CollectionMainIcon
            collectionType={collectionData[glCollectionOrderKey].type}
          />
        </ListItemIcon>
        <ListItemText
          primary={GetCollectionsName(
            collectionData[glCollectionOrderKey].type
          )}
          secondary={SecondaryAreaElement}
        />
        <IconButton
          edge="end"
          aria-label="開閉ボタン"
          onClick={handleExpandClick}
        >
          {allOpenFlag ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItem>
      <Collapse
        in={opacityOpenFlag}
        timeout="auto"
        className={classes.collapse}
      >
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} disableRipple>
            <CustomSliderContainer />
          </ListItem>
        </List>
      </Collapse>
      <Divider />
      <Collapse
        in={blendModeOpenFlag}
        timeout="auto"
        className={classes.collapse}
      >
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} disableRipple>
            <BlendModalContainer />
          </ListItem>
          <Divider />
        </List>
      </Collapse>
      <Divider />
      <Collapse in={colorOpenFlag} timeout="auto" className={classes.collapse}>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} disableRipple>
            <ColorPanelContainer />
          </ListItem>
          <Divider />
        </List>
      </Collapse>
      <Divider />
    </>
  );
};

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

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import CustomSliderContainer from '../../../container/CustomSliderContainer';
import BlendModalContainer from '../../../container/BlendModalContainer';
import ColorPanelContainer from '../../../container/ColorPanelContainer';
import CollectionFunctionMenuButton, {
  Props as CollectionFunctionMenuButtonPropsType,
} from '../../atoms/CollectionFunctionMenuButton';

import CollectionMainIcon from '../../atoms/CollectionMainIcon';
import GetCollectionsName from '../../../utils/GetCollectionsName';
import { GlCollectionOrderContext } from '../Collections';
import ImagePanelContainer from '../../../container/ImagePanelContainer';

import {
  GlCollectionInterfaceArray,
  CollectionTypeType,
} from '../../../stores/collectionData';

import allCollectionTypeFunctionObject, {
  collectionObjectFunctionType,
} from './allCollectionTypeFunctionObject';

export type Props = {
  collectionData: GlCollectionInterfaceArray;
  deleteSingleCollection: any;
  updateVisibility: any;
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

  /**
   * すべての機能ボタンが有効になっているかどうかのフラグ
   */
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

  /**
   * コレクションのプロパティの中で、コレクションのパネルを持つもののみの名前の配列
   */
  const openHasPanelPropsNameArray: (keyof collectionObjectFunctionType)[] = [
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

  /**
   * 単一のコレクションのフラグを確認して単一コレクションの総合開閉フラグを管理する関数
   */
  const handleExpandValueCheck = (): void => {
    if (
      openHasPanelPropsNameArray.every((flagName) => {
        if (collectionTypeFunctionObject[flagName] === false) {
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

  /**
   * 単一コレクションのvisibilityフラグハンドル関数
   */
  const handleVisibilityFlagClick = (): void => {
    const invertBoolValue = !visibilityOpenFlag;
    setVisibilityOpenFlag(invertBoolValue);
    updateVisibility({
      visibilityBoolValue: invertBoolValue,
      glCollectionOrderKey,
    });
  };

  /**
   * 単一コレクションのopacityフラグハンドル関数
   */
  const handleOpacityFlagClick = (): void => {
    setOpacityOpenFlag(!opacityOpenFlag);
    handleExpandValueCheck();
  };

  /**
   * 単一コレクションの描画モードフラグハンドル関数
   */
  const handleBlendModeFlagClick = (): void => {
    setBlendModeOpenFlag(!blendModeOpenFlag);
  };

  /**
   * 単一コレクションのカラーフラグハンドル関数
   */
  const handleColorFlagClick = (): void => {
    setColorOpenFlag(!colorOpenFlag);
  };

  /**
   * 単一コレクションの画像フラグハンドル関数
   */
  const handleImageFlagClick = (): void => {
    setImageOpenFlag(!imageOpenFlag);
  };

  /**
   * 単一コレクションのdeleteボタンを押した際に発火する関数
   */
  const handleDeleteIconClick = (): void => {
    deleteSingleCollection({
      deleteCollectionNumber: glCollectionOrderKey,
    });
  };

  /**
   * タイトル下のアイコン機能メニューのデータ一覧
   */
  const secondaryAreaElementDataArray: CollectionFunctionMenuButtonPropsType[] = [
    {
      labelTitleValue: '一時的に非表示にします',
      clickFunction: handleVisibilityFlagClick,
      isActiveFlag: visibilityOpenFlag,
      taretFunctionProp: 'visibility',
      currentCollectionType: singleCollectionType,
    },
    {
      labelTitleValue: '透過度パネルを開閉します',
      clickFunction: handleOpacityFlagClick,
      isActiveFlag: opacityOpenFlag,
      taretFunctionProp: 'opacity',
      currentCollectionType: singleCollectionType,
    },
    {
      labelTitleValue: '描画モードパネルを開閉します',
      clickFunction: handleBlendModeFlagClick,
      isActiveFlag: blendModeOpenFlag,
      taretFunctionProp: 'blendMode',
      currentCollectionType: singleCollectionType,
    },
    {
      labelTitleValue: 'カラーパネルを開閉します',
      clickFunction: handleColorFlagClick,
      isActiveFlag: colorOpenFlag,
      taretFunctionProp: 'color',
      currentCollectionType: singleCollectionType,
    },
    {
      labelTitleValue: '画像パネルを開閉します',
      clickFunction: handleImageFlagClick,
      isActiveFlag: imageOpenFlag,
      taretFunctionProp: 'image',
      currentCollectionType: singleCollectionType,
    },
    {
      labelTitleValue: 'レイヤー・コレクションを削除します',
      clickFunction: handleDeleteIconClick,
      taretFunctionProp: 'garbage',
      currentCollectionType: singleCollectionType,
    },
  ];

  /**
   * 単一コレクションのタイトル下のアイコンが並んでいる機能ボタンメニュー部分のReact要素
   */
  const SecondaryAreaElement = (
    <>
      {secondaryAreaElementDataArray.map((singleSecondaryElemData) => (
        <CollectionFunctionMenuButton {...singleSecondaryElemData} />
      ))}
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
      <Collapse in={imageOpenFlag} timeout="auto" className={classes.collapse}>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested} disableRipple>
            <ImagePanelContainer />
          </ListItem>
          <Divider />
        </List>
      </Collapse>
      <Divider />
    </>
  );
};

/* eslint no-nested-ternary: 0 */
import React, { useContext, useState, useEffect } from 'react';
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
import { Props as CollectionFunctionMenuButtonPropsType } from '../../atoms/CollectionFunctionMenuButton';
import CollectionMainIcon from '../../atoms/CollectionMainIcon';
import GetCollectionsName from '../../../utils/GetCollectionsName';
import { GlCollectionOrderContext } from '../Collections';
import ImagePanelContainer from '../../../container/ImagePanelContainer';
import ListItemWrap from '../ListItemWrap';

import {
  GlCollectionTypeArray,
  CollectionTypeType,
} from '../../../stores/collectionData';
import allCollectionTypeFunctionObject, {
  collectionObjectFunctionType,
} from './allCollectionTypeFunctionObject';
import CollectionFunctionMenuButtonContainer from '../../../container/CollectionFunctionMenuButtonContainer';

export type Props = {
  collectionData: GlCollectionTypeArray;
  deleteSingleCollection: any;
  updateVisibility: any;
};

/**
 * Material UIのスタイル
 */
const useStyles = makeStyles(() => ({
  main: {
    backgroundColor: `transparent`,
    '&:hover': {
      backgroundColor: `transparent`,
    },
    cursor: `default`,
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
   * すべての単一コレクションコンポーネントの開閉stateを変更する関数
   * @todo 必要なフラグのみ更新するようにしたい
   */
  const handleExpandClick = (): void => {
    setAllOpenFlag(!allOpenFlag);
    if (allOpenFlag) {
      setOpacityOpenFlag(false);
      setBlendModeOpenFlag(false);
      setColorOpenFlag(false);
      setImageOpenFlag(false);
    } else {
      setOpacityOpenFlag(true);
      setBlendModeOpenFlag(true);
      setColorOpenFlag(true);
      setImageOpenFlag(true);
    }
  };

  /**
   * 単一のコレクションのフラグを確認して単一コレクションの総合開閉フラグを管理する関数
   */
  useEffect((): void => {
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
    } else {
      setAllOpenFlag(false);
    }
  }, [
    opacityOpenFlag,
    blendModeOpenFlag,
    colorOpenFlag,
    imageOpenFlag,
    openHasPanelPropsNameArray,
    collectionTypeFunctionObject,
  ]);

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
      labelTitleValue: '一時的に非表示',
      clickFunction: handleVisibilityFlagClick,
      isActiveFlag: visibilityOpenFlag,
      taretFunctionProp: 'visibility',
      currentCollectionType: singleCollectionType,
      globalTooltopEnterDelayTime: 1000,
    },
    {
      labelTitleValue: '透過度パネルを開閉',
      clickFunction: handleOpacityFlagClick,
      isActiveFlag: opacityOpenFlag,
      taretFunctionProp: 'opacity',
      currentCollectionType: singleCollectionType,
      globalTooltopEnterDelayTime: 1000,
    },
    {
      labelTitleValue: '描画モードパネルを開閉',
      clickFunction: handleBlendModeFlagClick,
      isActiveFlag: blendModeOpenFlag,
      taretFunctionProp: 'blendMode',
      currentCollectionType: singleCollectionType,
      globalTooltopEnterDelayTime: 1000,
    },
    {
      labelTitleValue: 'カラーパネルを開閉',
      clickFunction: handleColorFlagClick,
      isActiveFlag: colorOpenFlag,
      taretFunctionProp: 'color',
      currentCollectionType: singleCollectionType,
      globalTooltopEnterDelayTime: 1000,
    },
    {
      labelTitleValue: '画像パネルを開閉',
      clickFunction: handleImageFlagClick,
      isActiveFlag: imageOpenFlag,
      taretFunctionProp: 'image',
      currentCollectionType: singleCollectionType,
      globalTooltopEnterDelayTime: 1000,
    },
    {
      labelTitleValue: 'レイヤー・コレクションを削除',
      clickFunction: handleDeleteIconClick,
      taretFunctionProp: 'garbage',
      currentCollectionType: singleCollectionType,
      globalTooltopEnterDelayTime: 1000,
    },
  ];

  /**
   * 単一コレクションのタイトル下のアイコンが並んでいる機能ボタンメニュー部分のReact要素
   */
  const SecondaryAreaElement = (
    <>
      {secondaryAreaElementDataArray.map((singleSecondaryElemData) => (
        <CollectionFunctionMenuButtonContainer {...singleSecondaryElemData} />
      ))}
    </>
  );

  return (
    <>
      <ListItem className={classes.main}>
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
      <ListItemWrap
        collapseIn={opacityOpenFlag && collectionTypeFunctionObject.opacity}
      >
            <CustomSliderContainer />
      </ListItemWrap>
      <ListItemWrap
        collapseIn={blendModeOpenFlag && collectionTypeFunctionObject.blendMode}
      >
            <BlendModalContainer />
      </ListItemWrap>
      <ListItemWrap
        collapseIn={colorOpenFlag && collectionTypeFunctionObject.color}
      >
            <ColorPanelContainer />
      </ListItemWrap>
      <ListItemWrap
        collapseIn={imageOpenFlag && collectionTypeFunctionObject.image}
      >
            <ImagePanelContainer />
      </ListItemWrap>
    </>
  );
};

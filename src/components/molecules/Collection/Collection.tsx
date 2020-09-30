/* eslint no-nested-ternary: 0 */
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { Typography } from '@material-ui/core';

/* eslint-disable import/no-unresolved */
import BlendModePanelContainer from 'containers/BlendModePanelContainer';
import ImagePanelContainer from 'containers/ImagePanelContainer';
import CustomSliderContainer from 'containers/CustomSliderContainer';
import ColorPanelContainer from 'containers/ColorPanelContainer';
import getCollectionsName from 'utils/collection/getCollectionsName';
import { CollectionCategoryType } from 'stores/collection/collection';
import { CollectionTypeType } from 'types/collection/collectionData';
import Icon, { IconTypeTypes } from 'components/atoms/Icon';
import CollectionMainIcon from 'components/atoms/CollectionMainIcon';
import CollectionPanelTitle from 'components/atoms/CollectionPanelTitle';
import CollectionPanel from 'components/molecules/CollectionPanel';
import CustomIconButton from 'components/molecules/CustomIconButton';
import CollectionPanelContent from 'components/molecules/CollectionPanelContent';
import RawCollectionDataContext from 'contexts/RawCollectionDataContext';
/* eslint-enable import/no-unresolved */
import allCollectionTypeFunctionObject, {
  collectionObjectFunctionType,
} from './allCollectionTypeFunctionObject';

export type Props = {
  storeDeleteSceneCollectionInnerItem: any;
  currentSceneCollectionData: any;
  rawCollectionData: CollectionCategoryType;
  // updateVisibility: any;
};

/**
 * アイコンの並んでいる機能リストの型
 */
export type secondaryAreaType = {
  typeName: IconTypeTypes;
  labelTitleValue: string;
  clickFunction: any;
  isActiveFlag?: boolean;
  isDangerFlag?: boolean;
  taretFunctionProp?: keyof collectionObjectFunctionType;
  currentCollectionType: CollectionTypeType;
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
const Collection: React.FC<Props> = (props) => {
  const {
    /* ,updateVisibility */
    rawCollectionData,
    currentSceneCollectionData,
    // storeDeleteCollection,
    storeDeleteSceneCollectionInnerItem,
  } = props;
  const classes = useStyles();

  /**
   * 現在使用している単一のcollectionの機能の可能、不可能についてのobject
   */
  const collectionTypeFunctionObject =
    allCollectionTypeFunctionObject[rawCollectionData.type];

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
  const handleVisibilityFlagClick = useCallback((): void => {
    const invertBoolValue = !visibilityOpenFlag;
    setVisibilityOpenFlag(invertBoolValue);
    // updateVisibility({
    //   visibilityBoolValue: invertBoolValue,
    //   glCollectionOrderKey,
    // });
  }, [visibilityOpenFlag]);

  /**
   * 単一コレクションのopacityフラグハンドル関数
   */
  const handleOpacityFlagClick = useCallback((): void => {
    setOpacityOpenFlag(!opacityOpenFlag);
  }, [opacityOpenFlag]);

  /**
   * 単一コレクションの描画モードフラグハンドル関数
   */
  const handleBlendModeFlagClick = useCallback((): void => {
    setBlendModeOpenFlag(!blendModeOpenFlag);
  }, [blendModeOpenFlag]);

  /**
   * 単一コレクションのカラーフラグハンドル関数
   */
  const handleColorFlagClick = useCallback((): void => {
    setColorOpenFlag(!colorOpenFlag);
  }, [colorOpenFlag]);

  /**
   * 単一コレクションの画像フラグハンドル関数
   */
  const handleImageFlagClick = useCallback((): void => {
    setImageOpenFlag(!imageOpenFlag);
  }, [imageOpenFlag]);

  /**
   * 単一コレクションのdeleteボタンを押した際に発火する関数
   */
  const handleDeleteIconClick = useCallback((): void => {
    storeDeleteSceneCollectionInnerItem({
      targetId: currentSceneCollectionData.currentId,
      targetInnerId: rawCollectionData.id,
    });
  }, [
    storeDeleteSceneCollectionInnerItem,
    currentSceneCollectionData.currentId,
    rawCollectionData.id,
  ]);

  /**
   * タイトル下のアイコン機能メニューのデータ一覧
   */
  const secondaryAreaElementDataArray: secondaryAreaType[] = [
    {
      typeName: 'functionVisibility',
      labelTitleValue: '一時的に非表示',
      clickFunction: handleVisibilityFlagClick,
      isActiveFlag: visibilityOpenFlag,
      taretFunctionProp: 'visibility',
      currentCollectionType: rawCollectionData.type,
    },
    {
      typeName: 'opacityPanel',
      labelTitleValue: '透過度パネルを開閉',
      clickFunction: handleOpacityFlagClick,
      isActiveFlag: opacityOpenFlag,
      taretFunctionProp: 'opacity',
      currentCollectionType: rawCollectionData.type,
    },
    {
      typeName: 'blendModePanel',
      labelTitleValue: '描画モードパネルを開閉',
      clickFunction: handleBlendModeFlagClick,
      isActiveFlag: blendModeOpenFlag,
      taretFunctionProp: 'blendMode',
      currentCollectionType: rawCollectionData.type,
    },
    {
      typeName: 'colorPanel',
      labelTitleValue: 'カラーパネルを開閉',
      clickFunction: handleColorFlagClick,
      isActiveFlag: colorOpenFlag,
      taretFunctionProp: 'color',
      currentCollectionType: rawCollectionData.type,
    },
    {
      typeName: 'imagePanel',
      labelTitleValue: '画像パネルを開閉',
      clickFunction: handleImageFlagClick,
      isActiveFlag: imageOpenFlag,
      taretFunctionProp: 'image',
      currentCollectionType: rawCollectionData.type,
    },
    {
      typeName: 'functionDelete',
      labelTitleValue: 'レイヤー・コレクションを削除',
      clickFunction: handleDeleteIconClick,
      isDangerFlag: true,
      taretFunctionProp: 'garbage',
      currentCollectionType: rawCollectionData.type,
    },
  ];

  return (
    <RawCollectionDataContext.Provider value={rawCollectionData}>
      <ListItem className={classes.main} id={rawCollectionData.id}>
        <ListItemIcon>
          <CollectionMainIcon collectionType={rawCollectionData.type} />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography>
              {getCollectionsName(rawCollectionData.type)}
            </Typography>
          }
          secondary={
            <>
              {secondaryAreaElementDataArray.map((singleSecondaryElemData) => (
                <CustomIconButton
                  key={singleSecondaryElemData.typeName}
                  type={singleSecondaryElemData.typeName}
                  labelTitle={singleSecondaryElemData.labelTitleValue}
                  buttonType="iconButton"
                  active={singleSecondaryElemData.isActiveFlag}
                  danger={singleSecondaryElemData.isDangerFlag}
                  disable={
                    singleSecondaryElemData.taretFunctionProp != null
                      ? !collectionTypeFunctionObject[
                          singleSecondaryElemData.taretFunctionProp
                        ]
                      : true
                  }
                  onClick={singleSecondaryElemData.clickFunction}
                  // buttonProps={{
                  //   fullWidth: true,
                  // }}
                >
                  {singleSecondaryElemData.labelTitleValue}
                </CustomIconButton>
              ))}
            </>
          }
        />
        <IconButton
          edge="end"
          aria-label="開閉ボタン"
          onClick={handleExpandClick}
        >
          {allOpenFlag ? (
            <Icon type="functionExpandLess" fontSize="large" />
          ) : (
            <Icon type="functionExpandMore" fontSize="large" />
          )}
        </IconButton>
      </ListItem>
      <CollectionPanel
        collapseIn={opacityOpenFlag && collectionTypeFunctionObject.opacity}
      >
        <>
          <CollectionPanelTitle beforeIcon={<Icon type="opacityPanel" />}>
            透過度パネル
          </CollectionPanelTitle>
          <CollectionPanelContent>
            <CustomSliderContainer />
          </CollectionPanelContent>
        </>
      </CollectionPanel>
      <CollectionPanel
        collapseIn={blendModeOpenFlag && collectionTypeFunctionObject.blendMode}
      >
        <>
          <CollectionPanelTitle beforeIcon={<Icon type="blendModePanel" />}>
            描画モードパネル
          </CollectionPanelTitle>
          <CollectionPanelContent>
            <BlendModePanelContainer />
          </CollectionPanelContent>
        </>
      </CollectionPanel>
      {rawCollectionData.roughType === 'color' && (
        <CollectionPanel
          collapseIn={colorOpenFlag && collectionTypeFunctionObject.color}
        >
          <>
            <CollectionPanelTitle beforeIcon={<Icon type="colorPanel" />}>
              カラーパネル
            </CollectionPanelTitle>
            <CollectionPanelContent>
              <ColorPanelContainer />
            </CollectionPanelContent>
          </>
        </CollectionPanel>
      )}
      {rawCollectionData.roughType === 'image' && (
        <CollectionPanel
          collapseIn={imageOpenFlag && collectionTypeFunctionObject.image}
        >
          <>
            <CollectionPanelTitle beforeIcon={<Icon type="imagePanel" />}>
              画像パネル
            </CollectionPanelTitle>
            <CollectionPanelContent>
              <ImagePanelContainer />
            </CollectionPanelContent>
          </>
        </CollectionPanel>
      )}
    </RawCollectionDataContext.Provider>
  );
};

export default Collection;

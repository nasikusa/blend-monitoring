/* eslint no-nested-ternary: 0 */

import React from 'react';
import { css } from '@emotion/core';
import IconButton from '@material-ui/core/IconButton';
import OpacityIcon from '@material-ui/icons/Opacity';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DeleteIcon from '@material-ui/icons/Delete';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import TextureIcon from '@material-ui/icons/Texture';
import HelpIcon from '@material-ui/icons/Help';

import CustomTooltip from '../CustomTooltip';

import collectionTypeFunctionObject, {
  collectionObjectFunctionType,
} from '../../molecules/Collection/allCollectionTypeFunctionObject';
import { CollectionTypeType } from '../../../stores/collectionData';

export type Props = {
  labelTitleValue: string;
  clickFunction: any;
  isActiveFlag?: boolean;
  taretFunctionProp?: keyof collectionObjectFunctionType;
  currentCollectionType: CollectionTypeType;
  globalTooltopEnterDelayTime: number;
};

const collectionFunctionButtonStyle = css`
  padding: 3px 6px;
`;

/**
 * コレクションのタイトル下にあるアイコン機能メニュボタンを作成する
 * @param props
 */
export default function CollectionFunctionMenuButton(props: Props) {
  const {
    labelTitleValue,
    clickFunction,
    isActiveFlag,
    taretFunctionProp,
    currentCollectionType,
    globalTooltopEnterDelayTime,
  } = props;

  console.log(globalTooltopEnterDelayTime);

  const IconElement = (iconProps: any) => {
    switch (taretFunctionProp) {
      case 'visibility':
        return isActiveFlag ? (
          <VisibilityIcon {...iconProps} />
        ) : (
          <VisibilityOffIcon {...iconProps} />
        );
      case 'opacity':
        return <OpacityIcon {...iconProps} />;
      case 'blendMode':
        return <PhotoLibraryIcon {...iconProps} />;
      case 'image':
        return <TextureIcon {...iconProps} />;
      case 'color':
        return <ColorLensIcon {...iconProps} />;
      case 'garbage':
        return <DeleteIcon {...iconProps} />;
      default:
        return <HelpIcon {...iconProps} />;
    }
  };
  if (taretFunctionProp === 'garbage') {
    return (
      <CustomTooltip
        enterDelay={globalTooltopEnterDelayTime}
        title={labelTitleValue}
      >
        <IconButton
          css={collectionFunctionButtonStyle}
          onClick={clickFunction}
          size="small"
        >
          <IconElement color="error" fontSize="small" />
        </IconButton>
      </CustomTooltip>
    );
  }

  if (taretFunctionProp != null) {
    return (
      <CustomTooltip enterDelay={1250} title={labelTitleValue}>
        <IconButton
          css={collectionFunctionButtonStyle}
          onClick={clickFunction}
          size="small"
        >
          <IconElement
            color={
              collectionTypeFunctionObject[currentCollectionType][
                taretFunctionProp
              ]
                ? isActiveFlag
                  ? 'secondary'
                  : 'inherit'
                : 'disabled'
            }
            fontSize="small"
          />
        </IconButton>
      </CustomTooltip>
    );
  }

  return (
    <IconButton size="small">
      <IconElement fontSize="small" />
    </IconButton>
  );
}

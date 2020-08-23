import React from 'react';
import { css } from '@emotion/core';
import chroma from 'chroma-js';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import { useTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import GlViewContainer from '../../../container/GlViewContainer';
import CustomIconButton from '../CustomIconButton';
import blendModeData, {
  BlendModesType,
} from '../../../constants/blendModeData';

import { CollectionTypeType } from '../../../stores/collectionData';
import { StoredMediaStateItemType } from '../../../stores/storedMedia';

type Props = {
  typeSpecialValue: string | BlendModesType | StoredMediaStateItemType | null;
  hasMultiItemCollectionBoolean: boolean;
  multiItemCollectionType: CollectionTypeType | null;
};

/**
 * glslでの描画するアイテム(glView)のラッパー。その他のinfoなど。
 */
export default (props: Props) => {
  const {
    typeSpecialValue,
    hasMultiItemCollectionBoolean,
    multiItemCollectionType,
  } = props;
  const theme = useTheme();
  const styles = {
    avatar: css`
      background-color: ${hasMultiItemCollectionBoolean &&
      multiItemCollectionType === 'multiColors' &&
      typeof typeSpecialValue === 'string'
        ? typeSpecialValue
        : theme.palette.background.default};
    `,
    innerSpacing: css`
      padding: 8px;
    `,
    outerSpacing: css`
      margin-bottom: 8px;
      margin-left: 4px;
      margin-right: 4px;
    `,
  };

  let blendModeHeadFirstString = '';

  /**
   * カードヘッドタイトルをここで設定している
   */
  const cardHeaderTitleValue = (() => {
    switch (multiItemCollectionType) {
      case 'multiColors': {
        if (typeSpecialValue != null && typeof typeSpecialValue === 'string') {
          const chromaData = chroma(typeSpecialValue).rgb();
          const [chromaRed, chromaGreen, chromaBlue] = chromaData;
          return `R: ${chromaRed} G: ${chromaGreen} B: ${chromaBlue}`;
        }
        return null;
      }
      case 'multiImages':
        if (typeSpecialValue != null && typeof typeSpecialValue !== 'string') {
          return typeSpecialValue.name;
        }
        return null;
      case 'singleImageMultiBlends':
      case 'singleColorMultiBlends':
        if (typeSpecialValue != null && typeof typeSpecialValue === 'string') {
          const keyOfBlendModeData: BlendModesType[] = Object.keys(
            blendModeData
          ) as BlendModesType[];
          const blendModeDataKey = typeSpecialValue as BlendModesType;
          if (keyOfBlendModeData.includes(blendModeDataKey)) {
            // @ts-ignore
            const blendModeName = blendModeData[typeSpecialValue].name.ja;
            blendModeHeadFirstString = blendModeName.charAt(0);
            return blendModeName;
          }
        }
        return null;
      default:
        return 'アイテム';
    }
  })();

  /**
   * マルチ画像コレクションが存在する場合は、ここの変数にソースをセットする
   */
  const glItemAvatarSrc = (() => {
    if (
      hasMultiItemCollectionBoolean &&
      multiItemCollectionType === 'multiImages' &&
      typeSpecialValue != null &&
      typeof typeSpecialValue !== 'string'
    ) {
      return typeSpecialValue?.resource.thumb;
    }
    return undefined;
  })();

  return (
    <Card css={styles.outerSpacing}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={glItemAvatarSrc} css={styles.avatar}>
            {(() => {
              switch (multiItemCollectionType) {
                case 'singleColorMultiBlends':
                case 'singleImageMultiBlends':
                  return blendModeHeadFirstString;
                case 'multiColors':
                case 'multiImages':
                  return <></>;
                default:
                  return <></>;
              }
            })()}
          </Avatar>
        }
        title={cardHeaderTitleValue}
        css={styles.innerSpacing}
      />
      <CardContent css={styles.innerSpacing}>
        <GlViewContainer />
      </CardContent>
      <CardActions disableSpacing css={styles.innerSpacing}>
        <CustomIconButton />
      </CardActions>
    </Card>
  );
};

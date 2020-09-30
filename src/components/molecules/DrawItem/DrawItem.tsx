import React from 'react';
import Draggable from 'react-draggable';
import { css } from '@emotion/core';
import chroma from 'chroma-js';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Fade from '@material-ui/core/Fade';
import CardHeader from '@material-ui/core/CardHeader';
import { useTheme } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

/* eslint-disable import/no-unresolved */
import GlViewContainer from 'containers/GlViewContainer';
import blendModeData, {
  BlendModesType,
} from 'constants/blendMode/blendModeData';
import { CollectionTypeType } from 'types/collection/collectionData';
import { StoredMediaStateItemType } from 'stores/image/storedMedia';
/* eslint-enable import/no-unresolved */
import Icon from '../../atoms/Icon';
import CustomIconButton from '../CustomIconButton';

type Props = {
  typeSpecialValue: string | BlendModesType | StoredMediaStateItemType | null;
  hasMultiItemCollectionBoolean: boolean;
  multiItemCollectionType: CollectionTypeType | null;
};

/**
 * glslでの描画するアイテム(glView)のラッパー。その他のinfoなど。
 * @todo propsで渡される typeSpecialValue があいまいになってしまっているので
 * 、 xxx | undefined的な感じでもいいので複数にしたいです。
 */
const DrawItem: React.FC<Props> = (props: Props) => {
  const {
    typeSpecialValue,
    hasMultiItemCollectionBoolean,
    multiItemCollectionType,
  } = props;
  // const [isDragActive] = useState(false)
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
      margin-top: 8px;
      margin-left: 4px;
      margin-right: 4px;
    `,
    draggableZIndex: css`
      position: relative;
      z-index: 1;
    `,
  };

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
            // blendModeHeadFirstString = blendModeName.charAt(0);
            return blendModeName;
          }
        }
        return null;
      default:
        return '描画アイテム';
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

  const AvatarSrcProp = (() => {
    return glItemAvatarSrc ? { src: glItemAvatarSrc } : {};
  })();

  const BlendModeTypeIcon = (() => {
    if (
      (multiItemCollectionType === 'singleImageMultiBlends' ||
        multiItemCollectionType === 'singleColorMultiBlends') &&
      typeSpecialValue != null &&
      typeof typeSpecialValue === 'string'
    ) {
      // @ts-ignore
      const singleBlendModeData = blendModeData[typeSpecialValue];
      if (singleBlendModeData.type.base === 'other') {
        return <Icon type="blendModeNormal" color="action" />;
      }
      if (singleBlendModeData.type.base === 'math') {
        return <Icon type="blendModeMath" color="action" />;
      }

      if (singleBlendModeData.type.base === 'normal') {
        switch (singleBlendModeData.type.brightness) {
          case '+':
            return <Icon type="blendModeBrightnessPlus" color="action" />;
          case '-':
            return <Icon type="blendModeBrightnessMinus" color="action" />;
          case '+-':
            return <Icon type="blendModeBrightnessPlusMinus" color="action" />;
          default:
            return <Icon type="functionHelp" color="action" />;
        }
      }

      return <Icon type="functionHelp" color="action" />;
    }
    return <Icon type="functionHelp" color="action" />;
  })();

  return (
    <Fade in>
      <Draggable disabled>
        <Card css={styles.outerSpacing}>
          <CardHeader
            avatar={
              <Avatar
                variant="rounded"
                aria-label="recipe"
                css={styles.avatar}
                {...AvatarSrcProp}
              >
                {(() => {
                  switch (multiItemCollectionType) {
                    case 'singleColorMultiBlends':
                    case 'singleImageMultiBlends':
                      return BlendModeTypeIcon;
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
            {false && <CustomIconButton />}
          </CardActions>
        </Card>
      </Draggable>
    </Fade>
  );
};

export default DrawItem;

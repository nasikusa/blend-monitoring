import React from 'react';
import { css } from '@emotion/core';
import { SketchPicker, SketchPickerProps } from 'react-color';
import { useTheme } from '@material-ui/core/styles';
import { baseSizeNamesType } from '../../../types/Size';

export type Props = Partial<{
  squarePicker: boolean;
  size: baseSizeNamesType | 'full';
  hueAndSingleColorSize: baseSizeNamesType;
  disablePresets: boolean;
  disableCurrentColor: boolean;
  disableHue: boolean;
  disableColorData: boolean;
  disableBoxShadow: boolean;
  bgColor: string;
  textColor: string;
  wrapperSpacing: 'none' | baseSizeNamesType;
}> &
  SketchPickerProps;

const CustomSketchPicker = (props: Props) => {
  const {
    squarePicker,
    size,
    hueAndSingleColorSize,
    // disablePresets,
    disableCurrentColor,
    disableHue,
    disableColorData,
    disableBoxShadow,
    bgColor,
    textColor,
    wrapperSpacing,
  } = props;
  const theme = useTheme();

  const sizeValue = (() => {
    switch (size) {
      case 'small':
        return '150';
      case 'medium':
        return '200';
      case 'large':
        return '300';
      case 'full':
        return 'initial';
      default:
        return '200';
    }
  })();

  const hueAndSingleColorSizeValue = (() => {
    switch (hueAndSingleColorSize) {
      case 'small':
        return 10;
      case 'medium':
        return 20;
      case 'large':
        return 30;
      default:
        return 20;
    }
  })();

  const wrapperSpacingValue = (() => {
    switch (wrapperSpacing) {
      case 'none':
        return 0;
      case 'small':
        return 5;
      case 'medium':
        return 10;
      case 'large':
        return 15;
      default:
        return 0;
    }
  })();

  /**
   * SketchPickerコンポーネントのスタイルを変更する。
   */
  const sketchPickerStyle = css`
    width: 100% !important;
    /* @todo カラーピッカーのサイズを変更できるようにしたいです */
    max-width: ${sizeValue}px !important;
    padding: ${wrapperSpacingValue}px !important;
    background: ${bgColor} !important;
    border-radius: 0px !important;
    ${disableBoxShadow && 'box-shadow: none !important;'}
    > div:nth-of-type(1) {
      /* カラーピッカーエリアの形 */
      padding-bottom: ${squarePicker ? '100%' : '75%'} !important;
    }
    > div:nth-of-type(2) {
      > div:nth-of-type(1) {
        ${disableHue && 'display: none !important;'}
        > div:nth-of-type(1) {
          /* HUE変更用のバー */
          height: ${hueAndSingleColorSizeValue}px !important;
          > div:nth-of-type(1) {
            > div:nth-of-type(1) {
              > div:nth-of-type(1) {
                > div:nth-of-type(1) {
                  /* HUEピッカーの白い選択バー */
                  height: ${hueAndSingleColorSizeValue - 2}px !important;
                }
              }
            }
          }
        }
      }
      > div:nth-of-type(2) {
        /* 単色確認用の色パネル */
        height: ${hueAndSingleColorSizeValue}px !important;
        ${disableCurrentColor && 'display: none;'}
        ${disableHue &&
        'width: 100% !important; margin-left: 0px !important;'}
        > div:nth-of-type(2) {
          /* 単色確認用のパネルのシャドー */
          box-shadow: none !important;
        }
      }
    }
    > div:nth-of-type(3) {
      ${disableColorData && 'display: none !important;'}
      > div {
        > div {
          > span {
            /* hex / r / g / b の文字のところ */
            padding-top: 7px !important;
            padding-bottom: 8px !important;
          }
        }
      }
    }
    span {
      /* 文字色の変更 */
      color: ${textColor || theme.palette.text.primary} !important;
    }
  `;

  return <SketchPicker css={sketchPickerStyle} {...props} />;
};

CustomSketchPicker.defaultProps = {
  disableAlpha: true,
  disableBoxShadow: true,
  bgColor: 'transparent',
};

export default CustomSketchPicker;

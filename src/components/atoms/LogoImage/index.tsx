/* eslint no-nested-ternary: 0 */
import React from 'react';
import { css } from '@emotion/core';

/**
 * propsの型
 */
export type Props = {
  square?: boolean;
  size?: 'icon' | 'small' | 'medium' | 'large';
  dense?: boolean;
  bgColor?: string;
  imageSrc?: string;
  noBg?: boolean;
  noSpace?: boolean;
};

/**
 * ロゴ画像コンポーネント
 */
const LogoImage = (props: Props) => {
  const { square, size, dense, bgColor, imageSrc, noBg, noSpace } = props;
  const logoImageBackStyle = css`
    background-color: ${noBg ? 'rgba(0,0,0,0)' : bgColor || '#232323'};
    border-radius: ${square ? '0%' : '50%'};
    padding: ${noSpace ? '0px' : dense ? '10px' : '20px'};
  `;
  const logoImageSize = (() => {
    switch (size) {
      case 'icon':
        return '18';
      case 'small':
        return '120';
      case 'medium':
        return '180';
      case 'large':
        return '240';
      default:
        return '180';
    }
  })();
  return (
    <img
      css={logoImageBackStyle}
      src={imageSrc || '/logo512.png'}
      alt="ロゴ画像"
      width={logoImageSize}
      height={logoImageSize}
    />
  );
};

export default LogoImage;

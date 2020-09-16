import React, { useState } from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import { css, SerializedStyles } from '@emotion/core';

type activeStyleTypeType = 'none' | 'scale' | 'opacity' | 'border';

type Props = Readonly<
  Partial<{
    bgColor: string;
    shapeType: 'circle' | 'heavyRound' | 'round' | 'lightRound' | 'square';
    borderColor: string;
    borderWidth: number;
    boxSize: 'small' | 'medium' | 'large' | 'exLarge';
    boxSizeHeightRatio: number;
    onClick: () => void;
    children: never;
    muiBoxProps: BoxProps;
    innerMuiBoxProps: BoxProps;
    active: boolean;
    activeStyleType:
      | activeStyleTypeType
      | [activeStyleTypeType, ...activeStyleTypeType[]];
  }>
>;

export const styles: { [K: string]: SerializedStyles } = {
  cursorDefault: css({
    cursor: 'default',
  }),
  cursorPointer: css({
    cursor: 'pointer',
  }),
  innerBase: css({
    width: '100%',
    height: '100%',
  }),
  shapeCircle: css({
    borderRadius: '50%',
  }),
  shapeSquare: css({
    borderRadius: '0px',
  }),
  shapeRound: css({
    borderRadius: '5px',
  }),
  shapeLightRound: css({
    borderRadius: '10px',
  }),
  shapeHeavyRound: css({
    borderRadius: '15px',
  }),
  activeTypeScale: css({
    transform: 'scale(0.8)',
  }),
  activeTypeOpacity: css({
    opacity: 0.7,
  }),
  activeTypeBorder: css({
    border: `2px solid #fff !important`,
  }),
};

/**
 * カラーボックスのサイズをpropsの値から出す関数
 */
const calcBoxSize = (boxSize: Props['boxSize']): number => {
  switch (boxSize) {
    case 'small':
      return 20;
    case 'medium':
      return 30;
    case 'large':
      return 50;
    case 'exLarge':
      return 75;
    default:
      return 30;
  }
};

/**
 * カラーボックスコンポーネント
 * カラー選択ボタンや、現在のカラーの表示、カラー一覧などに使用します
 * @todo active状態のときのpropsを入れたいです
 */
const ColorBox: React.FC<Props> = ({
  bgColor = '#000000',
  shapeType = 'square',
  active = false,
  borderColor = '#ffffff',
  borderWidth = 0,
  boxSize = 'medium',
  boxSizeHeightRatio = 1,
  onClick,
  muiBoxProps,
  innerMuiBoxProps,
  activeStyleType = 'scale',
}) => {
  const [isActive, setIsActive] = useState(active);

  const arrayActiveStyles =
    Array.isArray(activeStyleType) && active === true
      ? activeStyleType.map((singleActiveStyleType) => {
          switch (singleActiveStyleType) {
            case 'opacity':
              return styles.activeTypeOpacity;
            case 'scale':
              return styles.activeTypeScale;
            case 'border':
              return styles.activeTypeBorder;
            default:
              return undefined;
          }
        })
      : [];

  return (
    <Box
      onClick={onClick}
      css={[onClick ? styles.cursorPointer : styles.cursorDefault]}
      style={{
        width: `${calcBoxSize(boxSize)}px`,
        height: `${calcBoxSize(boxSize) * boxSizeHeightRatio}px`,
      }}
      {...muiBoxProps}
    >
      <Box
        bgcolor={bgColor}
        css={[
          styles.innerBase,
          styles.border,
          shapeType === 'circle' && styles.shapeCircle,
          shapeType === 'square' && styles.shapeSquare,
          shapeType === 'round' && styles.shapeRound,
          shapeType === 'lightRound' && styles.shapeLightRound,
          shapeType === 'heavyRound' && styles.shapeHeavyRound,
          isActive && activeStyleType === 'scale' && styles.activeTypeScale,
          isActive && activeStyleType === 'opacity' && styles.activeTypeOpacity,
          isActive && activeStyleType === 'border' && styles.activeTypeBorder,
          ...arrayActiveStyles,
        ]}
        style={{
          border: `${borderWidth}px solid ${borderColor}`,
        }}
        {...innerMuiBoxProps}
      />
    </Box>
  );
};

export default ColorBox;

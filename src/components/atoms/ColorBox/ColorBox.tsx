import React from 'react';
import Box from '@material-ui/core/Box';
import { css, SerializedStyles } from '@emotion/core';
import { shallowEqual } from 'react-redux';

/* eslint-disable import/no-unresolved */
import arrayEqual from 'utils/general/arrayEqual';
/* eslint-enable import/no-unresolved */

type activeStyleTypeType = 'none' | 'scale' | 'opacity' | 'border';

type Props = Readonly<
  Partial<{
    color: string;
    shapeType: 'circle' | 'heavyRound' | 'round' | 'lightRound' | 'square';
    borderColor: string;
    borderWidth: number;
    boxSize: 'small' | 'medium' | 'large' | 'exLarge';
    boxSizeHeightRatio: number;
    active: boolean;
    activeStyleType:
      | activeStyleTypeType
      | [activeStyleTypeType, ...activeStyleTypeType[]];
    'data-color': string;
    'data-index': number;
    onClick: (event: any) => void;
    children: never;
  }>
>;

export const styles: { [K: string]: SerializedStyles } = {
  root: css({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
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
  color = '#000000',
  shapeType = 'square',
  active = false,
  borderColor = '#ffffff',
  borderWidth = 0,
  boxSize = 'medium',
  boxSizeHeightRatio = 1,
  onClick,
  activeStyleType = 'scale',
  'data-index': dataIndex,
  'data-color': dataColor,
}) => {
  /**
   * activeの際のスタイルが複数選択されている場合は、こちらで管理している
   */
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
      css={[styles.root, onClick ? styles.cursorPointer : styles.cursorDefault]}
      style={{
        width: `${calcBoxSize(boxSize)}px`,
        height: `${calcBoxSize(boxSize) * boxSizeHeightRatio}px`,
      }}
      data-color={dataColor}
      data-index={dataIndex}
    >
      <Box
        bgcolor={color}
        css={[
          styles.innerBase,
          styles.border,
          shapeType === 'circle' && styles.shapeCircle,
          shapeType === 'square' && styles.shapeSquare,
          shapeType === 'round' && styles.shapeRound,
          shapeType === 'lightRound' && styles.shapeLightRound,
          shapeType === 'heavyRound' && styles.shapeHeavyRound,
          active && activeStyleType === 'scale' && styles.activeTypeScale,
          active && activeStyleType === 'opacity' && styles.activeTypeOpacity,
          active && activeStyleType === 'border' && styles.activeTypeBorder,
          ...arrayActiveStyles,
        ]}
        style={{
          border: `${borderWidth}px solid ${borderColor}`,
        }}
      />
    </Box>
  );
};

export default React.memo(ColorBox, (prevProps, nextProps) => {
  if (
    Array.isArray(prevProps.activeStyleType) &&
    Array.isArray(nextProps.activeStyleType)
  ) {
    const {
      activeStyleType: prevActiveStyleType,
      ...prevOtherProps
    } = prevProps;
    const {
      activeStyleType: nextActiveStyleType,
      ...nextOtherProps
    } = nextProps;
    return (
      shallowEqual(prevOtherProps, nextOtherProps) &&
      arrayEqual(prevProps.activeStyleType, nextProps.activeStyleType)
    );
  }
  return shallowEqual(prevProps, nextProps);
});

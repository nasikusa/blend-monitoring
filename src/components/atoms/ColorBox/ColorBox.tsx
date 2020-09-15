import React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import { css, SerializedStyles } from '@emotion/core';

type Props = Readonly<
  Partial<{
    bgColor: string;
    shapeType: 'circle' | 'heavyRound' | 'round' | 'lightRound' | 'square';
    borderColor: string;
    borderWidth: number;
    boxSize: 'small' | 'medium' | 'large' | 'exLarge';
    boxSizeHeightRatio: number;
    boxSpacing: number;
    onClick: () => void;
    children: never;
    muiBoxProps: BoxProps;
  }>
>;

/**
 * カラーボックスのサイズをpropsの値から出す関数
 */
const calcBoxSize = (boxSize: Props['boxSize']): string => {
  switch (boxSize) {
    case 'small':
      return '20px';
    case 'medium':
      return '30px';
    case 'large':
      return '50px';
    case 'exLarge':
      return '75px';
    default:
      return `30px`;
  }
};

/**
 * カラーボックスコンポーネント
 * カラー選択ボタンや、現在のカラーの表示、カラー一覧などに使用します
 * @todo active状態のときのpropsを入れたいです
 */
const ColorBox: React.FC<Props> = ({
  bgColor = '#000000',
  shapeType,
  borderColor = '#ffffff',
  borderWidth = 0,
  boxSize = 'medium',
  boxSizeHeightRatio = 1,
  boxSpacing = 0,
  onClick,
  muiBoxProps,
}) => {
  const resultBoxSize = calcBoxSize(boxSize);
  const boxSpacingUnit = 2;

  const styles: { [K: string]: SerializedStyles } = {
    base: css`
      cursor: ${onClick != null ? 'pointer' : 'default'};
    `,
    innerBase: css({
      width: '100%',
      height: '100%',
    }),
    background: css({
      backgroundColor: bgColor,
    }),
    shape: css({
      borderRadius: (() => {
        switch (shapeType) {
          case 'circle':
            return '50%';
          case 'square':
            return '0px';
          case 'lightRound':
            return '5px';
          case 'round':
            return '10px';
          case 'heavyRound':
            return '15px';
          default:
            return '0px';
        }
      })(),
    }),
    border: css`
      border: ${borderWidth}px solid ${borderColor};
    `,
    size: css`
      width: ${resultBoxSize};
      height: ${Number(resultBoxSize.slice(0, -2)) * boxSizeHeightRatio}px;
    `,
    spacing: css({
      padding: `${boxSpacing * boxSpacingUnit}px`,
    }),
  };

  return (
    <Box
      onClick={onClick}
      css={[styles.base, styles.size, styles.spacing]}
      {...muiBoxProps}
    >
      <Box
        css={[styles.innerBase, styles.background, styles.shape, styles.border]}
      />
    </Box>
  );
};

export default ColorBox;

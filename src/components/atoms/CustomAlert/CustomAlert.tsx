import React from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { css } from '@emotion/core';

export type Props = {
  disableClose?: boolean;
} & AlertProps;

/**
 * アラートコンポーネントのバツボタンを消すスタイル
 */
const deleteCloseButton = css`
  .MuiAlert-action {
    display: none;
  }
`;

const CustomAlert: React.FC<Props> = (props) => {
  const { disableClose } = props;
  return (
    <MuiAlert
      elevation={6}
      variant="filled"
      {...props}
      css={disableClose && deleteCloseButton}
    />
  );
};

export default CustomAlert;

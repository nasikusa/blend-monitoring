import React, { useState } from 'react';
import { css, Global } from '@emotion/core';
import { useTheme } from '@material-ui/core';

const BaseFoundationStyle = () => {
  const theme = useTheme();
  const [webkitScrollbarWidth] = useState('4px');
  const [webkitScrollbarBorderRadius] = useState('10px');

  const base = css`
    ::-webkit-scrollbar {
      width: ${webkitScrollbarWidth};
    }
    ::-webkit-scrollbar-track {
      border-radius: ${webkitScrollbarBorderRadius};
      background-color: rgba(0, 0, 0, 0);
      display: none;
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${theme.palette.text.secondary};
      border-radius: ${webkitScrollbarBorderRadius};
    }
    html,
    body {
      max-height: 100vh;
      font-family: ${theme.typography.fontFamily};
      height: 100%;
    }
    html {
      box-sizing: border-box;
      color: ${theme.palette.text.primary};
    }
    body {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background-color: ${theme.palette.background.default};
    }
  `;

  // 以前の背景カラーの色は #232323 でした。

  return <Global styles={base} />;
};

export default BaseFoundationStyle;

import { css } from '@emotion/core';

const base = css`
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
    background-color: #444444;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3);
  }
  html,
  body {
    max-height: 100vh;
    font-family: 'Noto Sans JP', sans-serif;
    padding-top: 0px !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  html {
    box-sizing: border-box;
  }
  body {
    background-color: #232323;
    color: #ffffff;
  }
`;

export default base;

import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { css } from '@emotion/core';
import CopyToClipboard from 'react-copy-to-clipboard';

import { AppSiteInfo, AppName } from '../../../constants/appConstantSettings';
// import LogoImage from '../../atoms/LogoImage';

const UnSatisfiedEnv = () => {
  const style = css`
    position: relative;
    max-width: 100%;
  `;
  return (
    <Box p={4}>
      <Box mb={2} display="flex" justifyContent="center" alignItems="center">
        <Typography variant="h5" align="center">
          {AppName}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography display="block" align="center" gutterBottom>
          BlendMonitoringは
          <br />
          画像やテクスチャ、カラー、描画モードなどの
          <br />
          複数の色の組み合わせを
          <br />
          一度に確認できる
          <br />
          カラーグレーディングツールです。
        </Typography>
      </Box>
      <Box mb={2}>
        <img
          css={style}
          src="/assets/image/manual/screen_demo/screen_example_01.jpg"
          alt="デモ画像"
        />
      </Box>
      <Box mb={2}>
        <Typography align="center">
          現在、モバイル端末はサポートされていません。
          <br />
          PCにてお試しください。
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Typography align="center">url : {AppSiteInfo.url}</Typography>
        <Box ml={4}>
          <CopyToClipboard text={AppSiteInfo.url}>
            <Button>copy</Button>
          </CopyToClipboard>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
        <Typography align="center">
          短縮url : {AppSiteInfo.shortenURL}
        </Typography>
        <Box ml={4}>
          <CopyToClipboard text={AppSiteInfo.shortenURL}>
            <Button>copy</Button>
          </CopyToClipboard>
        </Box>
      </Box>
    </Box>
  );
};

export default UnSatisfiedEnv;

import React from 'react';
import ReactMarkdown from 'react-markdown';
import Box from '@material-ui/core/Box';
import { css } from '@emotion/core';

/* eslint-disable import/no-unresolved */
import imageResouceSite from 'constants/image/imageResouceSite';
import markdownStyle from 'styles/markdown/markdown';
import developDepList from 'constants/develop/developDepList';
/* eslint-enable import/no-unresolved */

const docStyle = css`
  height: calc(100vh - 100px);
  overflow-y: scroll;
`;

export default function Doc() {
  const imageResouceSites = Object.keys(imageResouceSite)
    .map((siteData) => {
      // @ts-ignore
      return `* [${imageResouceSite[siteData].name}](${imageResouceSite[siteData].url})`;
    })
    .join('\n\n');

  const devListString = developDepList
    .map((depItem) => {
      if (depItem.wait != null && depItem.wait === true) {
        return '';
      }
      // @ts-ignore
      return `* [${depItem.name}](${
        depItem.site != null ? depItem.site : depItem.repo
      })`;
    })
    .join('\n\n');

  const input = `
### テクスチャサイト
主にフリーのテクスチャサイトをまとめました。
${imageResouceSites}

### 使わせていただいたライブラリ・フレームワーク

${devListString}

またその他の依存ライブラリパッケージ等にもお世話になりました。

本当にありがとうございます。
`;
  return (
    <Box p={4} css={docStyle}>
      <ReactMarkdown
        className="vscode-dark"
        css={markdownStyle}
        linkTarget="_blank"
        source={input}
      />
    </Box>
  );
}

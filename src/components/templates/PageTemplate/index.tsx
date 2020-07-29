import React from 'react';
import { css } from '@emotion/core';
import HeaderContainer from '../../../container/HeaderContainer';

export default (props: any) => {
  const { themeSettings, body } = props;

  const styles = css`
    padding-top: ${themeSettings.header.appBarHeight};
  `;

  return (
    <div css={styles}>
      <HeaderContainer />
      {body}
    </div>
  );
};

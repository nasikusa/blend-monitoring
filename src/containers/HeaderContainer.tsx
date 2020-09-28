import React from 'react';
import { useSelector } from 'react-redux';

/* eslint-disable import/no-unresolved */
import Header from 'components/organisms/Header';
import { AppState } from 'stores/index';
/* eslint-enable import/no-unresolved */

/**
 * ヘッダーコンポーネントのcontainer
 */
export default () => {
  const themeSettings = useSelector((state: AppState) => state.themeSettings);
  const combineProps = { themeSettings };

  return <Header {...combineProps} />;
};

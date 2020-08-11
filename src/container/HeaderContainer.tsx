import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/organisms/Header';
import { AppState } from '../stores/index';

/**
 * ヘッダーコンポーネントのcontainer
 */
export default () => {
  const themeSettings = useSelector((state: AppState) => state.themeSettings);
  const combineProps = { themeSettings };

  return <Header {...combineProps} />;
};

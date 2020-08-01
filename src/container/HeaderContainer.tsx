import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/organisms/Header';
import { AppState } from '../stores/index';

export default (props: any) => {
  const themeSettings = useSelector((state: AppState) => state.themeSettings);
  const combineProps = { themeSettings, ...props };

  return <Header {...combineProps} />;
};

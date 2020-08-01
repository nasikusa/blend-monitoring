import React from 'react';
import { useSelector } from 'react-redux';
import PageTemplate from '../components/templates/PageTemplate';
import { AppState } from '../stores/index';

export default (props: any) => {
  const themeSettings = useSelector((state: AppState) => state.themeSettings);

  const combineProps = { themeSettings, ...props };

  return <PageTemplate {...combineProps} />;
};

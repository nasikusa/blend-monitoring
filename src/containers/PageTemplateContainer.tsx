import React from 'react';
import { useSelector } from 'react-redux';

/* eslint-disable import/no-unresolved */
import PageTemplate from 'components/templates/PageTemplate';
import { AppState } from 'stores/index';
/* eslint-enable import/no-unresolved */

export default (props: any) => {
  const themeSettings = useSelector((state: AppState) => state.themeSettings);

  const combineProps = { themeSettings, ...props };

  return <PageTemplate {...combineProps} />;
};

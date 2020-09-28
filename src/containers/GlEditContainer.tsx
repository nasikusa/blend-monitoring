import React from 'react';
import { useSelector } from 'react-redux';

/* eslint-disable import/no-unresolved */
import { AppState } from 'stores/index';
import GlEdit from 'components/organisms/GlEdit';
/* eslint-enable import/no-unresolved */

export default () => {
  const themeSettings = useSelector((state: AppState) => state.themeSettings);

  const editPanelUpperMargin = `${
    Number(themeSettings.header.appBarHeight.slice(0, -2)) +
    Number(themeSettings.glEdit.tabButtonHeight.slice(0, -2)) +
    Number(themeSettings.footer.appBarHeight.slice(0, -2))
  }px`;

  const combineProps = { editPanelUpperMargin };

  return <GlEdit {...combineProps} />;
};

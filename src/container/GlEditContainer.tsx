import React from 'react';
import { useSelector } from 'react-redux';
import GlEdit from '../components/organisms/GlEdit';
import { AppState } from '../stores/index';

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

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* eslint-disable import/no-unresolved */
import Edit from 'components/pages/Edit';
import {
  updateSingleItemSize as updateSingleItemSizeAction,
  updateRowCount as updateRowCountAction,
} from 'stores/general/glSettings';
import { AppState } from 'stores/index';
/* eslint-enable import/no-unresolved */

const EditContainer: React.FC = () => {
  const themeSettings = useSelector((state: AppState) => state.themeSettings);
  const appSettings = useSelector((state: AppState) => state.glSettings);
  const { isShowDocArea } = appSettings;
  const dispatch = useDispatch();

  const headerAndFooterElementHeight =
    Number(themeSettings.header.appBarHeight.slice(0, -2)) +
    Number(themeSettings.footer.appBarHeight.slice(0, -2));
  const editAreaHeightvalue = `calc(100vh - ${headerAndFooterElementHeight}px)`;

  const updateSingleItemSize = React.useCallback(
    (val) => {
      dispatch(updateSingleItemSizeAction(val));
    },
    [dispatch]
  );

  const updateRowCount = React.useCallback(
    (val) => {
      dispatch(updateRowCountAction(val));
    },
    [dispatch]
  );

  const combineProps = {
    updateSingleItemSize,
    updateRowCount,
    isShowDocArea,
    editAreaHeightvalue,
  };

  return <Edit {...combineProps} />;
};

export default EditContainer;

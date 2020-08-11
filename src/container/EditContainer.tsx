import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Edit from '../components/pages/Edit';

import { updateSingleItemSize as updateSingleItemSizeAction } from '../stores/glSettings';
import { AppState } from '../stores/index';

export default () => {
  const themeSettings = useSelector((state: AppState) => state.themeSettings);
  const appSettings = useSelector((state: AppState) => state.glSettings);
  const { isShowDocArea } = appSettings;
  const dispatch = useDispatch();

  const updateSingleItemSize = React.useCallback(
    (val) => {
      dispatch(updateSingleItemSizeAction(val));
    },
    [dispatch]
  );

  const combineProps = { themeSettings, updateSingleItemSize, isShowDocArea };

  return <Edit {...combineProps} />;
};

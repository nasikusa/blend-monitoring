import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Edit from '../components/pages/Edit';

import { updateSingleItemSize as updateSingleItemSizeAction } from '../stores/glSettings';

export default (props:any) => {

    //@ts-ignore
    const themeSettings = useSelector((state) => state.themeSettings);
    const dispatch = useDispatch();
  
    const updateSingleItemSize = React.useCallback(
      () => {
        dispatch(updateSingleItemSizeAction)
      },
      [dispatch]
    );

    const _props = { themeSettings, updateSingleItemSize, ...props };
  
    return <Edit {..._props} />;
  }
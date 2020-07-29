import React from 'react';
import {useSelector} from 'react-redux';
import PageTemplate from '../components/templates/PageTemplate';

export default (props:any) => {

    //@ts-ignore
    const themeSettings = useSelector((state) => state.themeSettings);

    const _props = { themeSettings, ...props };
  
    return <PageTemplate {..._props} />;
  }
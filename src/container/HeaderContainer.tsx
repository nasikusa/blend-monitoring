import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../components/organisms/Header';

export default (props:any) => {

    //@ts-ignore
    const themeSettings = useSelector((state) => state.themeSettings);
    const _props = { themeSettings, ...props };
  
    return <Header {..._props} />;
  }
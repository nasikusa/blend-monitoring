import React from 'react';
import {useSelector} from 'react-redux';
import BlendModalContents from '../components/molecules/BlendModalContents';

export default (props:any) => {

    //@ts-ignore
    const collectionData = useSelector((state) => state.collectionData);

    const _props = { collectionData, ...props };
  
    return <BlendModalContents {..._props} />;
  }
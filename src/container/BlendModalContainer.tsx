import React from 'react';
import {useSelector} from 'react-redux';
import BlendModal  from '../components/molecules/BlendModal';

export default (props:any) => {

    //@ts-ignore
    const collectionData = useSelector((state) => state.collectionData);

    const _props = { collectionData, ...props };
  
    return <BlendModal {..._props} />;
  }
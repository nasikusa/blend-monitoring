import React from 'react';
import {useSelector} from 'react-redux';
import Collections from '../components/molecules/Collections';

export default (props:any) => {

    // @ts-ignore
    const collectionData = useSelector((state) => state.collectionData);

    const combineProps = { collectionData, ...props };
  
    return <Collections {...combineProps} />;
  }
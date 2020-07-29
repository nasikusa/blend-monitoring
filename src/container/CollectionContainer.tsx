import React from 'react';
import { useSelector } from 'react-redux';
import Collection from '../components/molecules/Collection';

export default (props: any) => {
  // @ts-ignore
  const collectionData = useSelector((state) => state.collectionData);

  const combineProps = { collectionData, ...props };

  return <Collection {...combineProps} />;
};

import React from 'react';
import { useSelector } from 'react-redux';
import Collection from '../components/molecules/Collection';

export default () => {
  // @ts-ignore
  const collectionData = useSelector((state) => state.collectionData);

  const combineProps = { collectionData };

  return <Collection {...combineProps} />;
};

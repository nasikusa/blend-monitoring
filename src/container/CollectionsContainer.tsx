import React from 'react';
import { useSelector } from 'react-redux';
import Collections from '../components/molecules/Collections';

export default () => {
  // @ts-ignore
  const collectionData = useSelector((state) => state.collectionData);

  const combineProps = { collectionData };

  return <Collections {...combineProps} />;
};

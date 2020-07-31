import React from 'react';
import { useSelector } from 'react-redux';
import BlendModal from '../components/molecules/BlendModal';

export default () => {
  // @ts-ignore
  const collectionData = useSelector((state) => state.collectionData);

  const combineProps = { collectionData };

  return <BlendModal {...combineProps} />;
};

import React from 'react';
import { useSelector } from 'react-redux';
import Collections from '../components/molecules/Collections';
import { AppState } from '../stores/index';

export default () => {
  const collectionData = useSelector((state: AppState) => state.collectionData);

  const combineProps = { collectionData };

  return <Collections {...combineProps} />;
};

import React from 'react';
import { useSelector } from 'react-redux';
import BlendModal from '../components/molecules/BlendModal';
import { AppState } from '../stores/index';

export default () => {
  const collectionData = useSelector((state: AppState) => state.collectionData);

  const combineProps = { collectionData };

  return <BlendModal {...combineProps} />;
};

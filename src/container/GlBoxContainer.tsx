import React from 'react';
import { useSelector } from 'react-redux';
import GlBox from '../components/organisms/GlBox';
import getLengthOfCollections from '../utils/getLengthOfCollections';
import { AppState } from '../stores/index';

export default (props: any) => {
  const collectionData = useSelector((state: AppState) => state.collectionData);

  const glItemCountValue = getLengthOfCollections(collectionData, 'max');

  const combineProps = { ...props, ...{ glItemCount: glItemCountValue } };

  return <GlBox {...combineProps} />;
};

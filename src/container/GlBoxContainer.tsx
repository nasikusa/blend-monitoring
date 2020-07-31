import React from 'react';
import { useSelector } from 'react-redux';
import GlBox from '../components/organisms/GlBox';

export default (props: any) => {
  // @ts-ignore
  const glItemCountValue = useSelector((state) => state.glSettings.itemCount);

  const combineProps = { ...props, ...{ glItemCount: glItemCountValue } };

  return <GlBox {...combineProps} />;
};

import React from 'react';
import BlendModal from '../components/molecules/BlendModal';

export default (props: any) => {
  const combineProps = { ...props };

  return <BlendModal {...combineProps} />;
};

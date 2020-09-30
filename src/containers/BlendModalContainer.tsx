import React from 'react';
/* eslint-disable import/no-unresolved */
import { Props as BlendModalProps } from 'components/molecules/BlendModal/BlendModal';
/* eslint-enable import/no-unresolved */
import BlendModal from '../components/molecules/BlendModal';

const BlendModalContainer: React.FC<BlendModalProps> = ({
  modalOpen,
  setModalOpen,
}) => {
  return <BlendModal modalOpen={modalOpen} setModalOpen={setModalOpen} />;
};

export default BlendModalContainer;

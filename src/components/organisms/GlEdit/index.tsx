import React from 'react';
import DropZone from '../../molecules/Dropzone';
import CollectionsContainer from '../../../container/CollectionsContainer';

export default function () {
  return (
    <div>
      GlEdit
      <DropZone />
      <CollectionsContainer />
    </div>
  );
}

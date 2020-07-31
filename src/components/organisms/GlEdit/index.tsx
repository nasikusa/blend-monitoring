import React from 'react';
import DropZone from '../../molecules/Dropzone';
import CollectionsContainer from '../../../container/CollectionsContainer';

/**
 * editパーツのコンポーネント
 */
export default () => {
  return (
    <div>
      GlEdit
      <DropZone />
      <CollectionsContainer />
    </div>
  );
};

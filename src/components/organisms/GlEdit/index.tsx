import React, { useState } from 'react';
import { css } from '@emotion/core';
import CollectionsContainer from '../../../container/CollectionsContainer';

/**
 * editパーツのコンポーネント
 */
  const { editPanelUpperMargin } = props;

  const tabPanelStyle = css`
    height: calc(100vh - ${editPanelUpperMargin});
  `;

  return (
    <div>
      GlEdit
      <DropZone />
      <CollectionsContainer />
    </div>
  );
};

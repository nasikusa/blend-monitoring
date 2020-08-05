import React from 'react';
import { useDispatch } from 'react-redux';
import CreateCollectionPanel from '../components/molecules/CreateCollectionPanel';

import { createCollection as createCollectionAction } from '../stores/collectionData';

export default () => {
  const dispatch = useDispatch();

  const createCollection = React.useCallback(
    (val) => {
      dispatch(createCollectionAction(val));
    },
    [dispatch]
  );

  const combineProps = { createCollection };

  return <CreateCollectionPanel {...combineProps} />;
};

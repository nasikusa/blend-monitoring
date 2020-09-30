import { useContext } from 'react';
/* eslint-disable import/no-unresolved */
import CollectionIdContext from 'contexts/CollectionIdContext';
/* eslint-enable import/no-unresolved */

function useCollectionIdContext() {
  const context = useContext(CollectionIdContext);
  if (!context)
    throw new Error(
      'useCollectionIdContext must be used with CollectionIdContext!'
    );
  return context;
}

export default useCollectionIdContext;

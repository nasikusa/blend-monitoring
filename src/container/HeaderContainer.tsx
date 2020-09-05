import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/organisms/Header';
import { AppState } from '../stores/index';
import useCollectionOpacityValue from '../hooks/collection/useCollectionOpacityValue';

/**
 * ヘッダーコンポーネントのcontainer
 */
export default () => {
  const result = useCollectionOpacityValue(
    '40818509-da04-44fd-baf2-af23312c7e36'
  );
  console.log(result);
  const themeSettings = useSelector((state: AppState) => state.themeSettings);
  const combineProps = { themeSettings };

  return <Header {...combineProps} />;
};

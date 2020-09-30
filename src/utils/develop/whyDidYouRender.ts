import React from 'react';

if (
  process.env.NODE_ENV === 'development' &&
  process.env.REACT_APP_IS_ACTIVATE_WDYR === '1'
) {
  // eslint-disable-next-line
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  // eslint-disable-next-line
  const ReactRedux = require('react-redux');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackExtraHooks: [[ReactRedux, 'useSelector']],
  });
}

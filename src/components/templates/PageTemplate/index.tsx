import React from 'react';
import HeaderContainer from '../../../containers/HeaderContainer';
import FooterContainer from '../../../containers/FooterContainer';

export default (props: any) => {
  const { body } = props;

  return (
    <div>
      <HeaderContainer />
      {body}
      <FooterContainer />
    </div>
  );
};

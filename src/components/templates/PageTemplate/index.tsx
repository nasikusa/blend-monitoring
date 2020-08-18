import React from 'react';
import HeaderContainer from '../../../container/HeaderContainer';
import FooterContainer from '../../../container/FooterContainer';

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

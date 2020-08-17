import React from 'react';
import HeaderContainer from '../../../container/HeaderContainer';
import Footer from '../../organisms/Footer';

export default (props: any) => {
  const { body } = props;

  return (
    <div>
      <HeaderContainer />
      {body}
      <Footer />
    </div>
  );
};

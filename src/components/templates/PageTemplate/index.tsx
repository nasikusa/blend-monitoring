import React from 'react';

/* eslint-disable import/no-unresolved */
import HeaderContainer from 'containers/HeaderContainer';
import FooterContainer from 'containers/FooterContainer';
/* eslint-enable import/no-unresolved */

type Props = {
  body: React.ReactNode;
};

const PageTemplate: React.FC<Props> = (props) => {
  const { body } = props;

  return (
    <div>
      <HeaderContainer />
      {body}
      <FooterContainer />
    </div>
  );
};

export default PageTemplate;

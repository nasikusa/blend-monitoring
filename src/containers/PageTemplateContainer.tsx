import React from 'react';

/* eslint-disable import/no-unresolved */
import PageTemplate from 'components/templates/PageTemplate';
/* eslint-enable import/no-unresolved */

type Props = {
  body: React.ReactNode;
};

const PageTemplateContainer: React.FC<Props> = (props) => {
  const combineProps = { ...props };

  return <PageTemplate {...combineProps} />;
};

export default PageTemplateContainer;

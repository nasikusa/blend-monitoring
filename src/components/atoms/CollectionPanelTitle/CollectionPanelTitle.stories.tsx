import React from 'react';
import CollectionPanelTitle, { Props } from './index';

export default {
  title: 'Components/CollectionPanelTitle',
  component: CollectionPanelTitle,
  argTypes: {},
};

export const Primary = (args: Props) => (
  <CollectionPanelTitle color="textPrimary" {...args} />
);

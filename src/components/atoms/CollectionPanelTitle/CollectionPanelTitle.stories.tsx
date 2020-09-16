import React from 'react';
import CollectionPanelTitle, { Props } from './index';
import Icon from '../../atoms/Icon';

export default {
  title: 'Components/CollectionPanelTitle',
  component: CollectionPanelTitle,
  argTypes: {},
};

export const Primary = (args: Props) => (
  <CollectionPanelTitle color="textPrimary" {...args} />
);

export const WithBeforeIcon = (args: Props) => (
  <CollectionPanelTitle
    color="textPrimary"
    beforeIcon={<Icon color="action" type="opacityPanel" />}
    {...args}
  />
);

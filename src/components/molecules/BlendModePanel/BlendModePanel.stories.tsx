import React from 'react';
import BlendModePanel from './BlendModePanel';

export default {
  title: 'components/BlendModePanel',
  component: BlendModePanel,
  argTypes: {},
};

export const Primary = (args: any) => <BlendModePanel {...args} />;

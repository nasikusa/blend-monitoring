import React from 'react';
import OpacitySlider from './index';
import MaterialUIThemeProvider from '../../../styles/theme/MaterialUIThemeProvider';

export default {
  title: 'OpacitySlider',
  component: OpacitySlider,
  decorators: [
    (Story: any) => (
      <MaterialUIThemeProvider>
        <Story />
      </MaterialUIThemeProvider>
    ),
  ],
  argTypes: {
    sliderMaxWidth: {
      control: 'range',
      min: 0,
      max: 500,
      step: 1,
    },
    onClick: { action: 'clicked' },
  },
};

export const Primary = (args: any) => (
  <OpacitySlider storedOpacityValue={0.5} sliderMaxWidth={300} {...args} />
);

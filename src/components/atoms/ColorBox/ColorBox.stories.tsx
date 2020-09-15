import React from 'react';
import ColorBox from './ColorBox';

export default {
  title: 'atoms/ColorBox',
  component: ColorBox,
  argTypes: {
    bgColor: { control: 'color' },
    borderColor: { control: 'color' },
    borderWidth: {
      control: { type: 'range', min: 0, max: 10, step: 1 },
    },
    boxSizeHeightRatio: {
      control: { type: 'range', min: 0, max: 2, step: 0.1 },
    },
    boxSpacing: {
      control: { type: 'range', min: 0, max: 10, step: 1 },
    },
  },
};

export const Primary = (args: any) => <ColorBox {...args} />;

Primary.args = {
  borderWidth: 0,
  boxSizeHeightRatio: 1,
  boxSpacing: 0,
};

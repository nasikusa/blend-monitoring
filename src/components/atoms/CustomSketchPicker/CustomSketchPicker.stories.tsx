import React from 'react';
import CustomSketchPicker from './CustomSketchPicker';

export default {
  title: 'CustomSketchPicker',
  component: CustomSketchPicker,
  argTypes: {
    bgColor: { control: 'color' },
    textColor: { control: 'color' },
    // borderWidth: { control: { type: 'number', min: 0, max: 10 } },
  },
};

export const Primary = () => <CustomSketchPicker />;

export const NoHueArea = (args: any) => (
  <CustomSketchPicker hueAndSingleColorSize="large" {...args} />
);

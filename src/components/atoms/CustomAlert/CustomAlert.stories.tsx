import React from 'react';
import CustomAlert from './CustomAlert';

export default {
  title: 'CustomAlert',
  component: CustomAlert,
};

export const Primary = () => <CustomAlert />;

export const NoHueArea = () => (
  <CustomAlert severity="info" disableClose={false}>
    ExampleText
  </CustomAlert>
);

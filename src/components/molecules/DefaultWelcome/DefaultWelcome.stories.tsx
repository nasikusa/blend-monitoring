import React from 'react';
import DefaultWelcome from './index';
import MaterialUIThemeProvider from '../../../styles/theme/MaterialUIThemeProvider';

export default {
  title: 'DefaultWelcome',
  component: DefaultWelcome,
  decorators: [
    (Story: any) => (
      <MaterialUIThemeProvider>
        <Story />
      </MaterialUIThemeProvider>
    ),
  ],
};

export const Primary = () => <DefaultWelcome />;

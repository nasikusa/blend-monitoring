// import { MaterialUIThemeProvider } from '../src/styles/theme/MaterialUIThemeProvider';

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  backgrounds: {
    default: 'dark',
    values: [
      {
        name: 'dark',
        value: '#333333',
      },
      {
        name: 'white',
        value: '#ffffff',
      },
    ],
  },
};

// export const decorators = [
//   (Story) => (
//     <MaterialUIThemeProvider>
//       <Story />
//     </ MaterialUIThemeProvider>
//   ),
// ];

import React from 'react';

export const GlItemOrderContext = React.createContext<number>(-1);

type Props = {
  value: number;
  children: React.ReactNode;
};

const GlItemOrderContextElement = (props: Props) => {
  const { value, children } = props;
  return (
    <GlItemOrderContext.Provider value={value}>
      {children}
    </GlItemOrderContext.Provider>
  );
};

export default GlItemOrderContextElement;

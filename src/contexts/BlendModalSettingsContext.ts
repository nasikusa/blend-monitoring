import { createContext, Dispatch, SetStateAction } from 'react';
/* eslint-disable import/no-unresolved */
/* eslint-enable import/no-unresolved */

type BlendModalSettingsContextType = {
  setModalTransparentFlag: Dispatch<SetStateAction<boolean>>;
  setModalMinifyFlag: Dispatch<SetStateAction<boolean>>;
  setCanDisplayNormalBlend: Dispatch<SetStateAction<boolean>>;
  setCanDisplayLighterBlend: Dispatch<SetStateAction<boolean>>;
  setCanDisplayLighterAndDarkerBlend: Dispatch<SetStateAction<boolean>>;
  setCanDisplayDarkerBlend: Dispatch<SetStateAction<boolean>>;
  setCanDisplayMathBlend: Dispatch<SetStateAction<boolean>>;
  modalTransparentFlag: boolean;
  modalMinifyFlag: boolean;
  canDisplayNormalBlend: boolean;
  canDisplayLighterBlend: boolean;
  canDisplayLighterAndDarkerBlend: boolean;
  canDisplayDarkerBlend: boolean;
  canDisplayMathBlend: boolean;
};

const BlendModalSettingsContext = createContext<BlendModalSettingsContextType>({
  setModalTransparentFlag: () => {},
  setModalMinifyFlag: () => {},
  setCanDisplayNormalBlend: () => {},
  setCanDisplayLighterBlend: () => {},
  setCanDisplayLighterAndDarkerBlend: () => {},
  setCanDisplayDarkerBlend: () => {},
  setCanDisplayMathBlend: () => {},
  modalTransparentFlag: false,
  modalMinifyFlag: false,
  canDisplayNormalBlend: true,
  canDisplayLighterBlend: true,
  canDisplayLighterAndDarkerBlend: true,
  canDisplayDarkerBlend: true,
  canDisplayMathBlend: true,
});

export default BlendModalSettingsContext;

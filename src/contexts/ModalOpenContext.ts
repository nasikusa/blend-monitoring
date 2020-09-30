import { createContext, Dispatch, SetStateAction } from 'react';

type ModalOpenContextType = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const ModalOpenContext = createContext<ModalOpenContextType>({
  isModalOpen: false,
  setIsModalOpen: () => {},
});

export default ModalOpenContext;

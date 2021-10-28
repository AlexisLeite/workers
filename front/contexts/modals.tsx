import React, { ReactElement, useContext, useState } from 'react';
import Modal from '../components/global/modal/modal';
import { ModalProps } from './../components/global/modal/modal';

type fun = () => void;
const ModalsContext = React.createContext<
  undefined | { addModal: (props: ModalProps) => fun; modals: ReactElement[] }
>(undefined);

var modalKeys = 0;

export function ModalProvider({ children }: { children: any }) {
  const [modals, updateModals] = useState<ReactElement[]>([]);

  function addModal(props: ModalProps) {
    function removeCurrentModal() {
      props.onClose && props.onClose();
      updateModals(modals.filter((modal) => modal.key !== newProps.key));
    }

    const newProps = {
      ...props,
      key: modalKeys++,
      onClose: removeCurrentModal,
    };

    updateModals([...modals, <Modal {...newProps} key={newProps.key} />]);

    return removeCurrentModal;
  }

  return <ModalsContext.Provider value={{ modals, addModal }}>{children}</ModalsContext.Provider>;
}

export function useModal() {
  const context = useContext(ModalsContext);

  if (!context) throw new Error(`useModal must be used within a ModalProvider`);

  return context;
}

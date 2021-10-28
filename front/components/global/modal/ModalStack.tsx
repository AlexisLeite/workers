import React, { ReactElement } from 'react';
import { useModal } from '../../../contexts/modals';

interface ModalStackProps {}

export default function ModalStack({}: ModalStackProps): ReactElement {
  const { modals } = useModal();

  return <div>{modals}</div>;
}

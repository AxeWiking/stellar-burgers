import { ReactNode } from 'react';
import { Modal } from '../modal';
import { useParams } from 'react-router-dom';

type OrderModalProps = {
  onClose: () => void;
  children: ReactNode;
};

export const OrderModal = ({ onClose, children }: OrderModalProps) => {
  const param = useParams<{ number: string }>();

  return (
    <Modal title={'#' + param.number!.padStart(6, '0')} onClose={onClose}>
      {children}
    </Modal>
  );
};

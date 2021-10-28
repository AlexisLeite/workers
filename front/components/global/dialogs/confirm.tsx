import React, { useEffect } from 'react';
import Key from '../../../services/key';
import Modal from '../modal/modal';

interface ConfirmProps {
  title?: string;
  content: any;
  onConfirm: () => void;
  onCancel?: () => void;
}

const ref = React.createRef<HTMLButtonElement>();

export default function Confirm(props: ConfirmProps) {
  useEffect(() => {
    ref.current?.focus();
    const unregisterEscape = Key.up('Escape', cancel);
    const unregisterEnter = Key.on('Enter', confirm);

    return () => {
      unregisterEnter();
      unregisterEscape();
    };
  });

  function cancel() {
    if (props.onCancel) {
      props.onCancel();
    }
  }

  function confirm() {
    console.log('Confirm');
    props.onConfirm();
  }

  return (
    <div>
      <style jsx>{`
        button:first-of-type {
          margin-right: 5px;
        }
        button:last-of-type {
          margin-right: 0;
        }
        .DialogControls {
          margin-top: 10px;
        }
        .DialogTitle {
          font-weight: bold;
        }
      `}</style>
      <Modal noKeyboard={true} backgroundStyle={{ backgroundColor: '#0005' }}>
        {props.title && <div className="DialogTitle">{props.title}</div>}
        <div className="DialogBody">{props.content}</div>
        <div className="DialogControls">
          {props.onCancel && <button onClick={cancel}>Cancel</button>}
          <button onClick={confirm} ref={ref}>
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
}

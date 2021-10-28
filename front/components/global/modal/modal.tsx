import React, { ReactElement, useEffect } from 'react';
import Key from '../../../services/key';

export interface ModalProps {
  backgroundClassName?: string;
  backgroundStyle?: { [key: string]: string };
  canClose?: boolean;
  children: any;
  className?: string;
  closeOnClick?: boolean;
  noKeyboard?: boolean;
  onClose?: () => void; // Must be used to handle the close requests
  style?: { [key: string]: string };
}

export default function Modal(props: ModalProps): ReactElement {
  useEffect(() => {
    if (!props.noKeyboard)
      return Key.up('Escape', () => {
        props.onClose && props.onClose();
      });
  });

  return (
    <div
      className={`modal ${props.backgroundClassName || ''}`}
      style={props.backgroundStyle}
      onClick={() => {
        (props.canClose === undefined || props.canClose) && props.onClose && props.onClose();
      }}
    >
      <style jsx>{`
        .modal {
          position: fixed;
          top: 50px;
          left: 0;
          bottom: 0;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal > div {
          border: 1px solid black;
          border-radius: 5px;
          background: white;
          padding: 20px;
        }
      `}</style>
      <div
        style={props.style}
        className={`${props.className || ''}`}
        onClick={(ev) => {
          if (props.closeOnClick && props.onClose) props.onClose();
          else ev.stopPropagation();
        }}
      >
        {props.children}
      </div>
    </div>
  );
}

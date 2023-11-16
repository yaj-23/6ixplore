import React from 'react';
import './modal.css'
import unlike from '../../assets/xSmall.svg'

export default function Modal({
    children,
    style = [],
    isOpen,
    onClose
}) {
    return (
      <>
        {isOpen && <div className={`modal`}
             style={{ ...style}}>
          <div className="modal-container">
            <div className="modal-button" onClick={onClose}>
              <img src={unlike} alt=""/>
            </div>
            <div className="modal-body">
            {children}
            </div>
          </div>
        </div>}
      </>
    )
  }
  
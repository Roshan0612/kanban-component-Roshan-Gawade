import React from 'react';

interface ModalProps {
  title?: string;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ title, open, onClose, children }) => {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black opacity-30" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-modal max-w-xl w-full p-4">
        {title && <h2 id="modal-title" className="text-lg font-medium mb-2">{title}</h2>}
        <div id="modal-description">{children}</div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="px-3 py-1 rounded bg-neutral-100">Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

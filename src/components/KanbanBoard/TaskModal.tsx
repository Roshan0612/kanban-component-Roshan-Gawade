import React, { useState } from 'react';
import type { KanbanTask } from './KanbanBoard.types';
import Modal from '../primitives/Modal';

interface TaskModalProps {
  open: boolean;
  task?: KanbanTask | null;
  onClose: () => void;
  onSave: (updates: Partial<KanbanTask>) => void;
}

export const TaskModal: React.FC<TaskModalProps> = ({ open, task, onClose, onSave }) => {
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');

  React.useEffect(() => {
    setTitle(task?.title ?? '');
    setDescription(task?.description ?? '');
  }, [task]);

  return (
    <Modal title={task ? 'Edit Task' : 'New Task'} open={open} onClose={onClose}>
      <div className="space-y-3">
        <label className="block text-sm">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border rounded p-2" />
        <label className="block text-sm">Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded p-2" />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 rounded bg-neutral-100">Cancel</button>
          <button
            onClick={() => onSave({ title, description })}
            className="px-3 py-1 rounded bg-primary-500 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;

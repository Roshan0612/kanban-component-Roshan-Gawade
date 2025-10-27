import React from 'react';
import type { KanbanTask } from './KanbanBoard.types';
import { formatDate, getInitials, getPriorityColor, isOverdue } from '../../utils/task.utils';

interface KanbanCardProps {
  task: KanbanTask;
  index: number;
  onClick?: (task: KanbanTask) => void;
}

export const KanbanCard: React.FC<KanbanCardProps> = ({ task, index, onClick }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${task.title}. Status: ${task.status}. Priority: ${task.priority}. Press space to grab.`}
      draggable
      onDragStart={handleDragStart}
      onClick={() => onClick?.(task)}
      className={`bg-white border border-neutral-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing mb-3 ${getPriorityColor(task.priority)}`}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-medium text-sm text-neutral-900 line-clamp-2">{task.title}</h4>
        {task.priority && <span className="text-xs px-2 py-0.5 rounded bg-neutral-100">{task.priority}</span>}
      </div>
      {task.description && <p className="text-xs text-neutral-600 mb-2 line-clamp-2">{task.description}</p>}
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {task.tags?.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-neutral-100 px-2 py-0.5 rounded">{tag}</span>
          ))}
        </div>
        {task.assignee && (
          <div className="w-6 h-6 bg-primary-500 rounded-full text-white text-xs flex items-center justify-center">
            {getInitials(task.assignee)}
          </div>
        )}
      </div>
      {task.dueDate && (
        <div className={`text-xs mt-2 ${isOverdue(task.dueDate) ? 'text-red-600' : 'text-neutral-500'}`}>
          Due: {formatDate(task.dueDate)}
        </div>
      )}
    </div>
  );
};

export default KanbanCard;

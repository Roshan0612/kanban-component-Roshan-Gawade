import React from 'react';
import type { KanbanColumn as ColumnType, KanbanTask } from './KanbanBoard.types';
import KanbanCard from './KanbanCard';

interface KanbanColumnProps {
  column: ColumnType;
  tasks: KanbanTask[];
  onTaskClick?: (task: KanbanTask) => void;
  onDropTask?: (taskId: string, toIndex: number) => void;
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({ column, tasks, onTaskClick, onDropTask }) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    // For simplicity append to end if no index provided
    onDropTask?.(id, tasks.length);
  };

  return (
    <div role="region" aria-label={`${column.title} column. ${column.taskIds.length} tasks.`} className="flex-shrink-0 w-72 mr-4">
      <div className="sticky top-0 bg-neutral-50 p-2 rounded-md mb-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">{column.title}</h3>
          <div className="text-xs text-neutral-500">{column.taskIds.length}</div>
        </div>
      </div>
      <div className="overflow-y-auto max-h-[70vh]" onDragOver={handleDragOver} onDrop={handleDrop}>
        {tasks.length === 0 ? (
          <div className="text-sm text-neutral-500 p-3">No tasks</div>
        ) : (
          tasks.map((t) => (
            <KanbanCard key={t.id} task={t} onClick={onTaskClick} />
          ))
        )}
      </div>
      <div className="mt-2">
        <button className="text-sm text-primary-600">+ Add task</button>
      </div>
    </div>
  );
};

export default KanbanColumn;

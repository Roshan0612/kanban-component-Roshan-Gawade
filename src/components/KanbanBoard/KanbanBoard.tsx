import React from 'react';
import type { KanbanViewProps, KanbanColumn as ColumnType } from './KanbanBoard.types';
import KanbanColumn from './KanbanColumn';
import type { KanbanTask } from './KanbanBoard.types';
import { useDragAndDrop } from '../../hooks/useDragAndDrop';

export const KanbanBoard: React.FC<KanbanViewProps> = ({ columns, tasks, onTaskMove, onTaskCreate, onTaskUpdate, onTaskDelete }) => {
  const { handleDragOver, handleDrop } = useDragAndDrop();

  const handleDropOnColumn = (e: React.DragEvent, toColumnId: string) => {
    handleDragOver(e);
    const id = handleDrop(e);
    if (!id) return;
    // for simplicity append to end
    onTaskMove(id, /* fromColumn - caller should deduce */ '', toColumnId, Number.MAX_SAFE_INTEGER);
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex items-start px-4 py-6">
        {columns.map((col: ColumnType) => (
          <div key={col.id} onDragOver={handleDragOver} onDrop={(e) => handleDropOnColumn(e, col.id)}>
            <KanbanColumn
              column={col}
              tasks={col.taskIds.map((id) => tasks[id]).filter(Boolean) as KanbanTask[]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

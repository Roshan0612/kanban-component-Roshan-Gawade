import { useCallback, useState } from 'react';
import type { KanbanColumn, KanbanTask } from '../components/KanbanBoard/KanbanBoard.types';
import { moveTaskBetweenColumns } from '../utils/column.utils';
import { reorderTasks } from '../utils/task.utils';

export const useKanbanBoard = (initialColumns: KanbanColumn[], initialTasks: Record<string, KanbanTask>) => {
  const [columns, setColumns] = useState<KanbanColumn[]>(initialColumns);
  const [tasks, setTasks] = useState<Record<string, KanbanTask>>(initialTasks);

  const onTaskMove = useCallback((taskId: string, fromColumnId: string, toColumnId: string, toIndex: number) => {
    setColumns((prev: KanbanColumn[]) => {
      const source = prev.find((c) => c.id === fromColumnId);
      const dest = prev.find((c) => c.id === toColumnId);
      if (!source || !dest) return prev;
      const moved = moveTaskBetweenColumns(source.taskIds, dest.taskIds, source.taskIds.indexOf(taskId), toIndex);
      return prev.map((c) => {
        if (c.id === source.id) return { ...c, taskIds: moved.source };
        if (c.id === dest.id) return { ...c, taskIds: moved.destination };
        return c;
      });
    });
  }, []);

  const onTaskCreate = useCallback((columnId: string, task: KanbanTask) => {
    setTasks((t: Record<string, KanbanTask>) => ({ ...t, [task.id]: task }));
    setColumns((cols: KanbanColumn[]) => cols.map((c) => (c.id === columnId ? { ...c, taskIds: [...c.taskIds, task.id] } : c)));
  }, []);

  const onTaskUpdate = useCallback((taskId: string, updates: Partial<KanbanTask>) => {
    setTasks((t: Record<string, KanbanTask>) => ({ ...t, [taskId]: { ...t[taskId], ...updates } }));
  }, []);

  const onTaskDelete = useCallback((taskId: string) => {
    setTasks((t: Record<string, KanbanTask>) => {
      const copy = { ...t };
      delete copy[taskId];
      return copy;
    });
    setColumns((cols: KanbanColumn[]) => cols.map((c) => ({ ...c, taskIds: c.taskIds.filter((id) => id !== taskId) })));
  }, []);

  const onReorderWithinColumn = useCallback((columnId: string, startIndex: number, endIndex: number) => {
    setColumns((prev: KanbanColumn[]) => prev.map((c) => (c.id === columnId ? { ...c, taskIds: reorderTasks(c.taskIds, startIndex, endIndex) } : c)));
  }, []);

  return {
    columns,
    tasks,
    onTaskMove,
    onTaskCreate,
    onTaskUpdate,
    onTaskDelete,
    onReorderWithinColumn
  } as const;
};

export default useKanbanBoard;

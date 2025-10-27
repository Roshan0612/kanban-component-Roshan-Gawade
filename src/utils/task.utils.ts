import { format } from 'date-fns';
import type { KanbanTask } from '../components/KanbanBoard/KanbanBoard.types';

export const isOverdue = (dueDate?: Date): boolean => {
  if (!dueDate) return false;
  return new Date() > dueDate;
};

export const getInitials = (name?: string): string => {
  if (!name) return '';
  return name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const formatDate = (d?: Date): string => {
  if (!d) return '';
  return format(d, 'MMM d, yyyy');
};

export const getPriorityColor = (priority?: KanbanTask['priority']): string => {
  const map: Record<string, string> = {
    low: 'border-l-4 border-blue-400',
    medium: 'border-l-4 border-yellow-400',
    high: 'border-l-4 border-orange-400',
    urgent: 'border-l-4 border-red-500'
  };
  return (priority && map[priority]) || map.medium;
};

export const reorderTasks = (tasks: string[], startIndex: number, endIndex: number): string[] => {
  const result = Array.from(tasks);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

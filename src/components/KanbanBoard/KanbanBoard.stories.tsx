import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KanbanBoard } from './KanbanBoard';
import useKanbanBoard from '../../hooks/useKanbanBoard';
import type { KanbanColumn, KanbanTask } from './KanbanBoard.types';

const sampleColumns: KanbanColumn[] = [
  { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: ['task-1', 'task-2'], maxTasks: 10 },
  { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: ['task-3'], maxTasks: 5 },
  { id: 'review', title: 'Review', color: '#f59e0b', taskIds: [], maxTasks: 3 },
  { id: 'done', title: 'Done', color: '#10b981', taskIds: ['task-4', 'task-5'] }
];

const sampleTasks: Record<string, KanbanTask> = {
  'task-1': {
    id: 'task-1',
    title: 'Implement drag and drop',
    description: 'Add D&D functionality to kanban cards',
    status: 'todo',
    priority: 'high',
    assignee: 'John Doe',
    tags: ['frontend', 'feature'],
    createdAt: new Date(2024, 0, 10),
    dueDate: new Date(2024, 0, 20)
  },
  'task-2': {
    id: 'task-2',
    title: 'Design task modal',
    description: 'Create modal for editing task details',
    status: 'todo',
    priority: 'medium',
    assignee: 'Jane Smith',
    tags: ['design', 'ui'],
    createdAt: new Date(2024, 0, 11),
    dueDate: new Date(2024, 0, 18)
  },
  'task-3': { id: 'task-3', title: 'Setup TypeScript', status: 'in-progress', priority: 'urgent', assignee: 'John Doe', tags: ['setup', 'typescript'], createdAt: new Date(2024, 0, 9) },
  'task-4': { id: 'task-4', title: 'Create project structure', description: 'Setup folder structure and initial files', status: 'done', priority: 'low', assignee: 'Jane Smith', tags: ['setup'], createdAt: new Date(2024, 0, 8), dueDate: new Date(2024, 0, 9) },
  'task-5': { id: 'task-5', title: 'Install dependencies', status: 'done', priority: 'low', assignee: 'John Doe', tags: ['setup'], createdAt: new Date(2024, 0, 8) }
};

const meta: Meta<typeof KanbanBoard> = {
  title: 'Components/KanbanBoard',
  component: KanbanBoard
};

export default meta;

export const Default: StoryObj<typeof KanbanBoard> = {
  render: () => {
    const { columns, tasks } = useKanbanBoard(sampleColumns, sampleTasks);
    return <KanbanBoard columns={columns} tasks={tasks} onTaskMove={() => {}} onTaskCreate={() => {}} onTaskUpdate={() => {}} onTaskDelete={() => {}} />;
  }
};

export const Empty: StoryObj<typeof KanbanBoard> = {
  render: () => {
    const emptyColumns: KanbanColumn[] = [
      { id: 'todo', title: 'To Do', color: '#6b7280', taskIds: [] },
      { id: 'in-progress', title: 'In Progress', color: '#3b82f6', taskIds: [] },
      { id: 'done', title: 'Done', color: '#10b981', taskIds: [] }
    ];
    const { columns, tasks } = useKanbanBoard(emptyColumns, {});
    return <KanbanBoard columns={columns} tasks={tasks} onTaskMove={() => {}} onTaskCreate={() => {}} onTaskUpdate={() => {}} onTaskDelete={() => {}} />;
  }
};

export const LargeDataset: StoryObj<typeof KanbanBoard> = {
  render: () => {
    const cols = sampleColumns.map((c) => ({ ...c }));
    const manyTasks: Record<string, KanbanTask> = { ...sampleTasks };
    for (let i = 6; i <= 40; i++) {
      const id = `task-${i}`;
      manyTasks[id] = { id, title: `Generated task ${i}`, status: cols[i % cols.length].id, createdAt: new Date() };
      cols[i % cols.length].taskIds.push(id);
    }
    const { columns, tasks } = useKanbanBoard(cols, manyTasks);
    return <KanbanBoard columns={columns} tasks={tasks} onTaskMove={() => {}} onTaskCreate={() => {}} onTaskUpdate={() => {}} onTaskDelete={() => {}} />;
  }
};

export const MobileView: StoryObj<typeof KanbanBoard> = {
  render: () => {
    const { columns, tasks } = useKanbanBoard(sampleColumns, sampleTasks);
    return (
      <div style={{ width: 375 }}>
        <KanbanBoard columns={columns} tasks={tasks} onTaskMove={() => {}} onTaskCreate={() => {}} onTaskUpdate={() => {}} onTaskDelete={() => {}} />
      </div>
    );
  }
};

export const Interactive: StoryObj<typeof KanbanBoard> = {
  render: () => {
    // interactive story with state managed by hook
    const { columns, tasks, onTaskMove, onTaskCreate, onTaskUpdate, onTaskDelete } = useKanbanBoard(sampleColumns, sampleTasks);
    return <KanbanBoard columns={columns} tasks={tasks} onTaskMove={onTaskMove} onTaskCreate={onTaskCreate} onTaskUpdate={onTaskUpdate} onTaskDelete={onTaskDelete} />;
  }
};

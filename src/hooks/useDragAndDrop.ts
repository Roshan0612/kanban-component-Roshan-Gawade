import { useCallback, useState } from 'react';

interface DragState {
  isDragging: boolean;
  draggedId: string | null;
}

export const useDragAndDrop = () => {
  const [state, setState] = useState<DragState>({ isDragging: false, draggedId: null });

  const handleDragStart = useCallback((e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    e.dataTransfer.effectAllowed = 'move';
    setState({ isDragging: true, draggedId: id });
    // add a drag image if desired
  }, []);

  const handleDragEnd = useCallback(() => {
    setState({ isDragging: false, draggedId: null });
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    return id;
  }, []);

  return {
    ...state,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDrop
  };
};

export default useDragAndDrop;

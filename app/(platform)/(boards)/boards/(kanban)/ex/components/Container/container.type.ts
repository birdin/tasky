import { UniqueIdentifier } from '@dnd-kit/core';

export default interface ContainerProps {
  id: UniqueIdentifier;
  children: React.ReactNode;
  title?: string;
  description?: string;
  number?: number;
  onAddItem?: () => void;
  editContainer: (id: UniqueIdentifier, title: string) => void;
}

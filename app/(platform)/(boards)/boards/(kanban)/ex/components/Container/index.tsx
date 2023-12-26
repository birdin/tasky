import React, { useState } from 'react';
import ContainerProps from './container.type';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { Button } from '../Button';
import { GripVertical, MoreVertical } from 'lucide-react';

const Container = ({
  id,
  children,
  number,
  title,
  description,
  onAddItem,
  editContainer
}: ContainerProps) => {

  const [isEditing, setIsEditing] = useState(false);

  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'container',
    },
  });

  const updateContainer = (newTitle: string) => {
    editContainer(id, newTitle)
  }

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        'w-full min-w-[300px] max-w-[350px] h-full  ',
        isDragging && 'opacity-50',
      )}
    >
      <div className='bg-gray-50 rounded flex flex-col gap-y-4 p-4'>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-y-1">
            <div
              className="p-2 text-xs rounded-xl opacity-40 hover:opacity-100"
              {...listeners}>
              <GripVertical/>
            </div>

            {isEditing ? (
              <input
                type="text"
                className=" p-1 border border-rose-700/50 rounded w-100 bg-transparent"
                value={title}
                onChange={(e) => updateContainer(e.target.value)}
                onKeyDown={el => {
                  if (el.key === 'Enter') {
                    setIsEditing(false)
                  }
                }}
                onBlur={() => setIsEditing(false)}
              />
            ) :
              <>
                <span className="text-gray-800 text-base font-medium">
                </span>
                <h1 className="text-gray-800 text-base font-medium">{title}</h1>
              </>
            }

            <p className="text-gray-400 text-sm">{description}</p>
          </div>
          <div onClick={() => setIsEditing(true)}>
            <MoreVertical />
          </div>
        </div>

        {children}
        <Button variant="ghost" onClick={onAddItem}>
          Add Item
        </Button>
      </div>
    </div>
  );
};

export default Container;

import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import React, { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { MoreHorizontal, MoreVertical } from 'lucide-react';
import { on } from 'events';

type ItemsType = {
  id: UniqueIdentifier;
  title: string;
  onEditItem: (id: UniqueIdentifier, title: string) => void;
  labelColor?: string;
  isPlaceholder?: boolean;
};

const Items = ({ id, title, onEditItem, labelColor, isPlaceholder }: ItemsType) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'item',
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [inputTitle, setInputTitle] = useState(title);

  if (isPlaceholder) {
    return (
      <div 
        ref={setNodeRef}
        {...attributes}
        className="h-0"
      ></div>
    )
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
        borderLeft: labelColor ? `5px solid ${labelColor}` : 'none',
      }}
      className={clsx(
        'px-2 py-4 bg-white shadow-sm rounded border w-full hover:ring-blue-500/40 hover:ring-2 cursor-pointer',
        isDragging && 'opacity-50 ring-2 ring-rose-400'
      )}
    >
      {isEditing ?
        <input
          type="text"
          className="w-full h-full bg-transparent outline-none ring-2 ring-rose-400/40 rounded px-2 py-1 text-sm"
          value={title}
          autoFocus
          onChange={(e) => {
            onEditItem(id, e.target.value);
          }}
          onBlur={() => {
            setIsEditing(false);
          }} />
        :
        <div className="flex items-center justify-between text-sm">
          {title}
          <button
            className="text-xs rounded-xl "
            onClick={() => {
              setIsEditing(true);
            }}>
            <MoreHorizontal className={'opacity-40 hover:opacity-100'} height={20} />
          </button>
        </div>
      }


    </div>
  );
};

export default Items;

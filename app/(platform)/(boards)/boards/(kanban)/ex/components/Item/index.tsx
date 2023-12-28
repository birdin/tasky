import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { MoreVertical } from 'lucide-react';

type ItemsType = {
  id: UniqueIdentifier;
  title: string;
};

const Items = ({ id, title }: ItemsType) => {
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
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        'px-2 py-4 bg-white shadow-sm rounded border w-full hover:ring-blue-500/40 hover:ring-2 cursor-pointer',
        isDragging && 'opacity-50 ring-2 ring-rose-400',
      )}
    >
      <div className="flex items-center justify-between text-sm">
        {title}
        <button
          className="text-xs rounded-xl "
        >
          <MoreVertical height={20}/>
        </button>
      </div>
    </div>
  );
};

export default Items;

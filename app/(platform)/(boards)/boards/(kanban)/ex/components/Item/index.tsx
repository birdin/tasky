import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';

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
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        'px-2 py-4 bg-white shadow-sm rounded border w-full hover:border-gray-200 cursor-pointer',
        isDragging && 'opacity-50 ring-2 ring-rose-500',
      )}
    >
      <div className="flex items-center justify-between text-sm">
        {title}
        <button
          className="border p-2 text-xs rounded-xl "
          {...listeners}
        >
          Drag Handle
        </button>
      </div>
    </div>
  );
};

export default Items;

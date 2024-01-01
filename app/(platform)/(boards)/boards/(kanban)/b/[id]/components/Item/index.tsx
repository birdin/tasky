import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import React, { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { MoreHorizontal, MoreVertical } from 'lucide-react';
import { on } from 'events';
import { Item } from '../../types';

type ItemsType = {
  id: UniqueIdentifier | string;
  item: Item | null;
  title: string;
  onEditItem: (id: UniqueIdentifier | string, title: any) => void;
  labelColor?: string;
  isPlaceholder?: boolean;
};

const Items = ({ id, title, onEditItem, labelColor, isPlaceholder, item }: ItemsType) => {
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
        className="h-0 order-last"
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
        <div>
          <input
            type="text"
            className="w-full h-full bg-transparent outline-none ring-2 ring-rose-400/40 rounded px-2 py-1 text-sm"
            value={item?.title}
            autoFocus
            onChange={(e) => {
              const newItem = { ...item }
              newItem.title = e.target.value;
              onEditItem(id, newItem);
            }}
            onBlur={() => {
              /*
              */
            }} />
          <div>
            <textarea className="w-full h-full bg-transparent outline-none ring-2 ring-rose-400/40 rounded px-2 py-1 text-sm" value={item?.description} onChange={(e) => {
              const newItem = { ...item }
              newItem.description = e.target.value;
              onEditItem(id, newItem);
            }} />
          </div>
          <div className="div">

          </div>
          <div className="py-2 px-2 bg-black rounded text-white"
            onClick={() => {
              setIsEditing(false);
            }}>
            Save
          </div>
        </div>
        :
        <div className="flex items-center justify-between text-sm">
          <div className="flex flex-col gap-1">
            <h3 className='text-base font-medium'>
              {item?.title}
            </h3>
            <p className='text-gray-500'>
              {item?.description}
            </p>
            <div className="tag">
              <label className='text-rose-900 bg-rose-300 text-[11px] px-3 rounded'>
                Important
              </label>
            </div>
          </div>
          <button
            className="text-xs rounded-xl "
            onClick={() => {
              setIsEditing(true);
            }}>
            <MoreHorizontal className={'opacity-40 hover:opacity-100'} height={20} />
          </button>
        </div>
      }
    </div >
  );
};



export default Items;

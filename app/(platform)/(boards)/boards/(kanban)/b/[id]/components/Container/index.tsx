import React, { useState } from 'react';
import ContainerProps from './container.type';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { Button } from '../Button';
import { GripVertical, MoreHorizontal, MoreVertical, Plus } from 'lucide-react';

const Container = ({
  id,
  children,
  number,
  title,
  description,
  onAddItem,
  editContainer,
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
        maxHeight: "calc(100vh - 140px)",
      }}
      className={clsx(
        'w-full min-w-[300px] max-w-[350px] h-full  ',
        isDragging && 'opacity-50',
      )}
    >
      <div className='bg-gray-50 rounded-lg flex flex-col gap-y-2 p-2'>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-y-1 w-full">
            <div
              className="p-1 text-xs rounded-xl opacity-30 hover:opacity-100"
              {...listeners}>
              <GripVertical className='h-5' />
            </div>

            {isEditing ? (
              <input
                type="text"
                className=" p-1 outline-none focus:ring-2 ring-rose-400/50 text-sm rounded w-full bg-transparent"
                value={title}
                onChange={(e) => updateContainer(e.target.value)}
                autoFocus
                onBlur={() => setIsEditing(false)}
                onKeyDown={el => {
                  if (el.key === 'Enter') {
                    setIsEditing(false)
                  }
                }}
              />
            ) :
              <>
                {(number && number > 1) ?
                  <div className='bg-sky-800/50	rounded px-2 mr-2 text-xs	font-semibold  text-white	'>
                    { number - 1 }
                  </div>
                  : ''
                }
                <h1 className="text-gray-800 text-base font-semibold">{title}</h1>
              </>
            }

            <p className="text-gray-400 text-sm">{description}</p>
          </div>
          <button className='py-[12px]' onClick={onAddItem}>
            <Plus className='h-5 mr-2 opacity-80'/>
          </button>
          <div className={"mr-2"} onClick={() => setIsEditing(true)}>
            <MoreHorizontal className='h-5' />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Container;

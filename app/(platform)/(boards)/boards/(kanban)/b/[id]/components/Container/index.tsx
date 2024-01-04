import React, { useState } from 'react';
import ContainerProps from './container.type';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { GripVertical, MoreHorizontal, Pencil, Plus, Archive } from 'lucide-react';
import { DropdownMenu, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Container = ({
  id,
  children,
  number,
  title,
  description,
  onAddItem,
  editContainer,
  onRemoveContainer
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
        'w-[320px] h-full  ',
        isDragging && 'opacity-50',
      )}
    >
      <div className='bg-gray-50 rounded-md flex flex-col p-2'>
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
                className=" p-1 outline-none ring-2 focus:ring-2 ring-rose-400/50 text-sm rounded w-full bg-transparent"
                value={title}
                onChange={(e) => updateContainer(e.target.value)}
                autoFocus={true}
                onBlur={() => setIsEditing(false)}
                onKeyDown={el => {
                  if (el.key === 'Enter') {
                    setIsEditing(false)
                  }
                }}
              />
            ) : (
              <>
                <h1 className="text-gray-800 text-base">
                  {title}
                </h1>
                {(number && number > 1) ?
                  <div className='bg-sky-800/50	rounded px-2 ml-2 text-xs	font-semibold  text-white	'>
                    {number - 1}
                  </div>
                  : ''
                }
              </>
            )
            }

            <p className="text-gray-400 text-sm">{description}</p>
          </div>
          <button className='py-[8px] mr-2' onClick={onAddItem}>
            <Plus className='h-5 opacity-80' />
          </button>
          <DropdownMenu>
            <div className={"mr-2 flex"}>
              <DropdownMenuTrigger>
                <MoreHorizontal className='h-5' />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsEditing(true)}>
                <Pencil height={14} className='opacity-80' />
                Edit title
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onRemoveContainer()}>
                <Archive height={14} className='opacity-80' />
                Remove container
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>

        {children}
      </div>
    </div>
  );
};

export default Container;

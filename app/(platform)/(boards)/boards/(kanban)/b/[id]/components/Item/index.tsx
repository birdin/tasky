import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import React, { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { MoreHorizontal, MoreVertical } from 'lucide-react';
import { Item } from '../../types';
import { Select, SelectTrigger } from '@radix-ui/react-select';
import { SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from '@/components/ui/select';

type ItemsType = {
  id: UniqueIdentifier | string;
  item: Item | null;
  title: string;
  onEditItem: (id: UniqueIdentifier | string, title: any) => void;
  onDeleteItem: (id: UniqueIdentifier | string) => void;
  labelColor?: string;
  isPlaceholder?: boolean;
};

const Items = (
  { id, 
    title, 
    onEditItem, 
    onDeleteItem,
    labelColor, 
    isPlaceholder, 
    item 
  }: ItemsType) => {
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

  if (isPlaceholder) {
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        className="h-0 order-first"
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
            <SelectDemo label={item?.labelColor}
              onChangeLabel={(label) => {
                const newItem = { ...item }
                newItem.labelColor = label;
                onEditItem(id, newItem);
              }} />
          </div>
          <div className="py-2 px-2 bg-black rounded text-white"
            onClick={() => {
              setIsEditing(false);
            }}>
            Save
          </div>
          <div className="">
            <button className="py-2 px-2 bg-black rounded text-white"
              onClick={() => {
                setIsEditing(false);
                onDeleteItem(id);
              }}>
              Delete
            </button>
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
              {
                item?.labelColor ?
                  <label className='text-rose-900 bg-rose-300 text-[11px] px-3 rounded'>
                    {item.labelColor}
                  </label>
                  : <></>
              }
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

function SelectDemo(
  {
    label,
    onChangeLabel
  }
    : {
      label: string | undefined,
      onChangeLabel: (label: string) => void;
    }) {
  return (
    <Select value={label}
      onValueChange={onChangeLabel}
      defaultValue='default'
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="default">Not Defined</SelectItem>
          <SelectItem value="regular">Regular</SelectItem>
          <SelectItem value="important">Important</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}


export default Items;

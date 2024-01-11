import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import React, { useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { FileText, MoreHorizontal } from 'lucide-react';
import { Item } from '../../types';
import { Select, SelectTrigger } from '@radix-ui/react-select';
import { SelectContent, SelectGroup, SelectItem, SelectValue } from '@/components/ui/select';

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

  //console.log('item', item);

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
          <div className="flex flex-col gap-1 w-full">
            <h3 className='text-base font-medium'>
              {item?.title}
            </h3>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="">
                {
                  item?.member && (
                    <div className="rounded-full bg-rose-600 w-7 h-7 flex justify-center items-center">
                      <div className="text-white">
                        {item?.member?.name?.split(' ')[0].charAt(0).toUpperCase()}
                      </div>
                    </div>
                  )
                }
              </div>
              <div className='text-gray-400'>
                {
                  item?.description &&
                  <div className='flex items-center gap-1 text-[13px]'>
                    <FileText width={14} />
                    <span>
                      Description
                    </span>
                  </div>
                }
              </div>
              <div className="tag">
                {
                  item?.label?.map((label) => {
                    return (
                      <label key={`label-${label.id}`} className='bg-sky-200 text-sky-800 text-[13px] px-3 rounded capitalize border border-sky-400'>
                        {label.title}
                      </label>
                    )
                  })
                }



                {/*
                  item?.labelColor ?
                    <label className='bg-sky-200 text-sky-800 text-[13px] px-3 rounded capitalize border border-sky-400'>
                      {item.labelColor}
                    </label>
                  : <></>*/
                }
              </div>
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

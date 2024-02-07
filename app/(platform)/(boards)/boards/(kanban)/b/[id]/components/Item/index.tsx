import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import React, { useEffect, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { CalendarIcon, FileText, MoreHorizontal, Text } from 'lucide-react';
import { Item } from '../../types';
import { Select, SelectTrigger } from '@radix-ui/react-select';
import { SelectContent, SelectGroup, SelectItem, SelectValue } from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
} from "@/components/ui/sheet"
import { useDebounce } from '@/hooks/useDebounce';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';


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
  const [open, setOpen] = useState(false);

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
    <>
      <SheetDemo
        open={open}
        setOpen={el => setOpen(el)}
        item={item}
        onEditItem={onEditItem}
        onDeleteItem={onDeleteItem}
        id={id}
      />

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
          ' bg-white shadow-sm rounded border w-full hover:ring-blue-500/40 hover:ring-2 cursor-pointer',
          isDragging && 'opacity-50 ring-2 ring-rose-400'
        )}
      >
        {isEditing ?
          <div></div>
          :
          <>
            <div className=" px-2 py-4 flex items-center justify-between text-sm" onClick={el => setOpen(true)}>
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
                  //setIsEditing(true);
                }}>
                <MoreHorizontal className={'opacity-40 hover:opacity-100'} height={20} />
              </button>
            </div>
          </>
        }
      </div >
    </>
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

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  item: Item | null;
  onEditItem: (id: UniqueIdentifier | string, title: any) => void;
  onDeleteItem: (id: UniqueIdentifier | string) => void;
  id: UniqueIdentifier | string;

}


function SheetDemo({ open, setOpen, item, onEditItem, onDeleteItem, id }: Props) {
  const [title, setTitle] = useState(item?.title)
  const [description, setDescription] = useState(item?.description)
  const [label, setLabel] = useState('')
  const [labelColor, setLabelColor] = useState('')
  const [member, setMember] = useState('')

  const [editTitle, setEditTitle] = useState(false)
  const [editDescription, setEditDescription] = useState(false)

  const [updatedItem, setUpdatedItem] = useState<any>(item);

  const val = useDebounce(updatedItem, 2500)

  useEffect(() => {
    onEditItem(id, updatedItem);
    //console.log('val', val)
  }, [val])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="md:min-w-[500px]">
        <SheetHeader className='mt-2'>
        </SheetHeader>
        <div>
          <div className='min-h-12 flex items-center'>

            {
              !editTitle ? (
                <h2
                  onClick={() => { setEditTitle(true) }}
                  className='font-semibold text-xl px-2 py-1'>{updatedItem?.title}</h2>
              ) :
                <>
                  <input
                    type="text"
                    className="w-full h-full bg-transparent outline-none ring-2 ring-rose-400/40 rounded px-2 py-1 text-xl"
                    value={updatedItem?.title}
                    autoFocus
                    onChange={(e) => {
                      //if key is enter the, change setEditTitle to false
                      const newItem = { ...item }
                      newItem.title = e.target.value;
                      setUpdatedItem(newItem);
                    }}
                    onBlur={() => {
                      setEditTitle(false);

                    }} />
                </>
            }
          </div>

          <div className="flex items-center flex-wrap my-2">
            <LabelSelect />
            <StatusSelect setUpdatedItem={setUpdatedItem} statusValue={updatedItem?.status} updatedItem={updatedItem} />
            <DateSelect setUpdatedItem={setUpdatedItem} dateValue={updatedItem?.dueDate} updatedItem={updatedItem} />
          </div>
          <div>
            <div className="px-2 py-1 text-sm flex items-start mt-1" onClick={() => { setEditDescription(true) }}>
              <div className="mr-2">
                <Text width={16} />
              </div>
              {
                editDescription ? (
                  <textarea
                    className="w-full block min-h-30 bg-transparent outline-none ring-2 ring-rose-400/40 rounded px-2 py-1 text-sm" value={updatedItem?.description}
                    autoFocus
                    rows={7}
                    onBlur={() => {
                      setEditDescription(false);
                    }}
                    onChange={(e) => {
                      const newItem = { ...item }
                      newItem.description = e.target.value;
                      setUpdatedItem(newItem);
                    }} />
                ) : (
                  <div className="">
                    {updatedItem?.description ? updatedItem?.description : <span className='text-slate-500'>Add a description (optional)</span>}
                  </div>
                )
              }
            </div>
          </div>
          {
            /*
          <div>
            <SelectDemo label={updatedItem?.labelColor}
              onChangeLabel={(label) => {
                const newItem = { ...item }
                newItem.labelColor = label;
                setUpdatedItem(newItem);
              }} />
          </div>
          <div className="py-2 px-2 bg-black rounded text-white"
            onClick={() => {
              //setIsEditing(false);
            }}>
            Save
          </div>
          <div className="">
            <button className="py-2 px-2 bg-black rounded text-white"
              onClick={() => {
                //setIsEditing(false);
                onDeleteItem(id);

              }}>
              Delete
            </button>
          </div>
                */
          }
        </div>
      </SheetContent>
    </Sheet>
  )
}


const LabelSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-[110px] text-sm text-muted-foreground">
        <div className="flex items-center gap-1 text-muted-foreground">
          <span className='w-[25px] h-[12px] rounded-md bg-red-400 border-w-1 ml-2 mr-2'></span>
          <SelectValue placeholder="Color" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
      </SelectContent>
    </Select>
  )
}

const STATUS_OPTIONS = [
  { value: 'default', label: 'No define' },
  { value: 'pending', label: 'Pending' },
  { value: 'progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
]

const StatusSelect = ({ setUpdatedItem, statusValue, updatedItem }: { setUpdatedItem: any, statusValue: any, updatedItem: any }) => {
    const [status, setStatus] = useState(statusValue || 'default')

  const handleOnChange = (el: string) => {
    console.log('Updated item ', updatedItem)
    setStatus(el)
    setUpdatedItem({...updatedItem, status: el})
  }

  return (
    <Select value={status} defaultValue='default' onValueChange={(el) => handleOnChange(el)}>
      <SelectTrigger className="w-[110px] text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <div className="ml-1 mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              fill="none"
              viewBox="0 0 12 12"
            >
              <g clipPath="url(#clip0_607_9)">
                <path
                  fill="#6E6E6E"
                  fillRule="evenodd"
                  d="M11.956 5.275A6 6 0 01.868 9.109a.563.563 0 01.962-.584 4.875 4.875 0 106.691-6.697.563.563 0 01.582-.963 6 6 0 012.853 4.41zM6.75.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm-4.647 3a.75.75 0 10-1.294-.759.75.75 0 001.294.759zM.75 5.25a.75.75 0 110 1.5.75.75 0 010-1.5zm3-3.147A.75.75 0 103.008.799a.75.75 0 00.742 1.304z"
                  clipRule="evenodd"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_607_9">
                  <path fill="#fff" d="M0 0H12V12H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </div>
          <SelectValue placeholder="Status" />
        </div>
      </SelectTrigger>
      <SelectContent>
        {
          STATUS_OPTIONS.map((option, index) => {
            return (
              <SelectItem key={`${option.value}-${index}`} value={option.value}>{option.label}</SelectItem>
            )
          }
          )}
      </SelectContent>
    </Select>
  )
}


const DateSelect = ({ setUpdatedItem, dateValue, updatedItem }: { setUpdatedItem: any, dateValue: any, updatedItem: any }) => {
  const [date, setDate] = React.useState<Date>(dateValue)

  const handleOnChange = (el: Date | undefined) => {
    if(!el) return;
    console.log('Updated item ', updatedItem)
    setDate(el)
    setUpdatedItem({...updatedItem, dueDate: el})
  }

  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "min-w-[110px] text-sm flex items-center br-1",
            !date && "text-muted-foreground"
          )}>
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate)=> handleOnChange(newDate)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}


export default Items;

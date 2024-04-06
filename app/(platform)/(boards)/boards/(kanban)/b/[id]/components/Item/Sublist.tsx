import clsx from 'clsx';
import { Check, Plus, X } from 'lucide-react';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

type SubListProps = {
    setUpdatedItem: any;
    updatedItem: any;
    taskListElement: any;
}

type ItemListType = {
    id: any;
    name: string;
    done: boolean;
}

export default function SubList({setUpdatedItem, updatedItem, taskListElement}:SubListProps) {
    const [taskList, setTaskList] = useState(taskListElement ? taskListElement : [] as ItemListType[])

    const addTask = (task: string) => {
        setTaskList([...taskList, {
            id: uuidv4(),
            name: task,
            done: false
        }])

        setUpdatedItem({
            ...updatedItem,
            taskList: [...taskList, {
                id: uuidv4(),
                name: task,
                done: false
            }]
        })
    }

    const removeTask = (id: any) => {
        setTaskList(taskList.filter((task:any) => task.id !== id))
    }

    const checkTask = (id: any) => {
        setTaskList(taskList.map((task:any) => {
            if (task.id === id) {
                return {
                    ...task,
                    done: !task.done
                }
            }
            return task;
        }))
    }

    return (
        <>
            <div>
                <h3 className='text-sm font-semibold mt-4 mb-2 text-slate-500'>Subtasks</h3>
                <ul>
                    {taskList?.map((task:any) => {
                        return (
                            <Item key={task.id} task={task} removeTask={removeTask} checkTask={checkTask} />
                        )
                    })}
                </ul>
            </div>
            <div className="flex items-center gap-2">
                <div className="">
                    <Plus className='text-slate-400' size={18} />
                </div>
                <input
                    type="text"
                    placeholder='Añador tarea...'
                    className='focus:outline-none border-b border-slate-200 text-sm block py-3 w-full bg-transparent'
                    onKeyDown={(e) => {
                        if (e.key !== "Enter") return;
                        addTask(e.currentTarget.value);
                        e.currentTarget.value = '';
                    }}
                />
            </div>
        </>
    )
}

type ItemProps = {
    task: ItemListType;
    removeTask: (id: any) => void;
    checkTask: (id: any) => void;
}

const Item = ({ task, removeTask, checkTask }: ItemProps) => {
    const [edit, setEdit] = useState(false);

    return (
        <li className='flex items-center justify-between gap-2 py-2 text-sm border-b'>
            <div onClick={() => checkTask(task.id)}>
                <div className={clsx('w-5 h-5 border-2 rounded-full cursor-pointer',
                    task.done && 'bg-slate-400 flex items-center justify-center')}>
                    {task.done && <Check className="text-white" size={15}
                    />}
                </div>
            </div>
            {
                !edit ? (
                    <span className={clsx('mr-auto ml-2 w-full', task.done && 'text-slate-500 line-through')}
                        onDoubleClickCapture={() => setEdit(true)}>{task.name}</span>
                ) : (
                    <input
                        type="text"
                        defaultValue={task.name}
                        className='focus:outline-none ring border-slate-200 text-sm block px-1 w-full bg-transparent'
                        onKeyDown={(e) => {
                            if (e.key !== "Enter") return;
                            setEdit(false);
                        }}
                        autoFocus
                        onBlur={() => setEdit(false)}                    />
                )
            }
            <button onClick={() => removeTask(task.id)} className='text-slate-400'>
                <X size={15} />
            </button>
        </li>
    )
}
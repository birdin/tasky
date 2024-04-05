import clsx from 'clsx';
import { Check, Plus, X } from 'lucide-react';
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

type Props = {}

type ItemList = {
    id: any;
    name: string;
    done: boolean;
}

export default function SubList() {
    const [taskList, setTaskList] = useState([] as ItemList[])

    const addTask = (task: string) => {
        setTaskList([...taskList, {
            id: uuidv4(),
            name: task,
            done: true
        }])
    }

    return (
        <>
            <div>
                <ul>
                    {taskList.map(task => {
                        return (
                            <li key={task.id} className='flex items-center justify-between gap-2 py-2 text-sm border-b'>

                                <div className={clsx('w-5 h-5 border-2 rounded-full cursor-pointer', 
                                    task.done && 'bg-slate-400 flex items-center justify-center')}>
                                        {task.done && <Check className="text-white" size={15}/>}
                                </div>
                                <span className={clsx('mr-auto ml-2', task.done && 'text-slate-500 line-through')}>{task.name}</span>
                                <button onClick={() => { }} className='text-slate-400'>
                                    <X size={15}/>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="flex items-center gap-2">
                <div className="">
                    <Plus className='text-slate-400' size={18}/>
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
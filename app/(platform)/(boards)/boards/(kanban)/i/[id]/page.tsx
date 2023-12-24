"use client";

import { v4 } from "uuid";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { createPortal } from "react-dom";
import { set } from "react-hook-form";

const columnList = [
    { id: v4(), title: "To Do", tasksIds: [] },
    { id: v4(), title: "In progress", tasksIds: [] },
    { id: v4(), title: "Done", tasksIds: [] },
]


export default function KanbanBoardPage({ params }: { params: { id: string } }) {
    const [activeColumn, setActiveColumn] = useState<any>(null);
    const [columns, setColumns] = useState<any>(columnList);
    const [tasks, setTasks] = useState<any>([]);
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );


    function updateColumn(id: string, title: string) {
        const newColumns = columns.map((col: any) => {
            if (col.id !== id) return col;
            return { ...col, title };
        });

        setColumns(newColumns);
    }


    function onDragStart(event: any) {
        if (event.active.data.current?.type === "column") {
            setActiveColumn(event.active.data.current.column);
        }
    }

    function onDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over.id) {
            console.log("Hello world");
        }

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAColumn = active.data.current?.type === "column";
        if (!isActiveAColumn) return;

        setColumns((columns: any) => {
            const activeColumnIndex = columns.findIndex((columns: { id: any; }) => columns.id === activeId);

            const overColumnIndex = columns.findIndex((columns: { id: any; }) => columns.id === overId);

            return arrayMove(columns, activeColumnIndex, overColumnIndex);
        }
        );

        setActiveColumn(null);
    }

    function createTask(columnId: String) {
        const newTask = {
            id: v4(),
            columnId,
            content: `Task ${tasks.length + 1}`,
        };

        setTasks([...tasks, newTask]);
        console.log(tasks);
    }

    return (
        <>
            <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors}>
                <div className="flex gap-2">
                    <SortableContext items={columns.map((column: any) => column.id)}>
                        {columns.map((column: any) => (
                            <ColumnContainer
                                key={column.id}
                                item={column}
                                createTask={createTask}
                                updateColumn={updateColumn}
                                task={tasks.filter((task: any) => task.columnId === column.id)}
                            ></ColumnContainer>
                        ))}

                    </SortableContext>
                </div>
                {createPortal(

                    <DragOverlay>
                        {activeColumn && (
                            <ColumnContainer
                                item={activeColumn}
                                updateColumn={updateColumn}
                                createTask={createTask}
                                task={tasks.filter((task: any) => task.columnId === activeColumn.id)}
                            ></ColumnContainer>
                        )}
                    </DragOverlay>
                    , document.body
                )}
            </DndContext>
        </>
    )

}

const ColumnContainer = ({ item, updateColumn, createTask, task }: { item: any, updateColumn: any, createTask: any, task: any }) => {
    const [editMode, setEditMode] = useState(false);

    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable(
        {
            id: item.id ?? v4(),
            data: { type: "column", column: item },
            disabled: editMode
        })

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    if (isDragging) {
        return (
            <div className="bg-stone-300 w-48 opacity-50 ring-2" ref={setNodeRef} style={style}>
                <h3>
                    <div className="cursor-pointer"></div>
                </h3>
            </div>
        )
    }

    return (
        <div className="bg-stone-300 w-48" ref={setNodeRef} style={style}>
            <h3 onClick={() => setEditMode(true)} className="break-all">
                {
                    !editMode
                        ? item.title :
                        (<input type="text"
                            autoFocus onBlur={() => setEditMode(false)}
                            value={item.title}
                            onChange={(e) => { updateColumn(item.id, e.target.value) }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    setEditMode(false);
                                }
                            }}
                        />
                        )}
                <div className="cursor-pointer" {...attributes} {...listeners}>✋</div>
            </h3>
            <ul>
                {
                    task.map((el: any) => (
                        <TaskCard key={el.id} item={el} />
                    ))
                }

            </ul>
            <div>
                <button
                    className="padding text-center w-full"
                    onClick={() => createTask(item.id)}>
                    Add task
                </button>
            </div>
        </div>
    )
}

const TaskCard = ({ item }: { item: any }) => {
    const [mouseIsOver, setMouseIsOver] = useState(false);
    const { content } = item;
    return (
        <div
            className="pointer"
            onMouseEnter={() => {
                setMouseIsOver(true);
            }}
            onMouseLeave={() => {
                setMouseIsOver(false);
            }}>
            {mouseIsOver && '✋'}
            {content}
        </div>
    )
}
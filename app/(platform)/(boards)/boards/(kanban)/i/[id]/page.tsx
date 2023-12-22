"use client";

import { v4 } from "uuid";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
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
            const activeIndex = columns.findIndex(
                (column: any) => column.id === activeId
            );

            const overIndex = columns.findIndex(
                (column: any) => column.id === overId
            );

            const newColumns = [...columns];
            newColumns.splice(activeIndex, 1);
            newColumns.splice(overIndex, 0, activeColumn);

            return newColumns;
        }
        );

        setActiveColumn(null);
    }

    return (
        <>
            <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <div className="flex gap-2">
                    <SortableContext items={columns.map((column:any) => column.id)}>
                    {columns.map((column:any) => (
                        <ColumnContainer key={column.id} item={column}></ColumnContainer>
                    ))}

                    </SortableContext>
                </div>
                {createPortal(

                <DragOverlay>
                    {activeColumn && (
                        <ColumnContainer item={activeColumn}></ColumnContainer>
                        )}
                </DragOverlay>
                , document.body
                )}
            </DndContext>
        </>
    )

}

const ColumnContainer = ({ item }: { item: any }) => {
    const { title } = item;

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
        })

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    if(isDragging) {
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
            <h3>
                {title} 
                <div className="cursor-pointer" {...attributes} {...listeners}>✋</div>
            </h3>
        </div>
    )
}
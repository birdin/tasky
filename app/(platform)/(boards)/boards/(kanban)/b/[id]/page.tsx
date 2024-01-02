"use client";

import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

// DnD
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import Container from './components/Container';
import Items from './components/Item';
import { KanbanSquare, Plus, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Item } from './types';
import { BoardSettingForm } from './components/Forms/BoardSettingForm';

type DNDType = {
  id: UniqueIdentifier;
  title: string;
  items: Item [];
};

const containerExample: DNDType[] = [
  {
    id: 'container-1',
    title: 'To do',
    items: [
      {
        id: 'item-1',
        title: 'Item 1',
      },
      {
        id: 'item-2',
        title: 'Item 2',
      },
      {
        id: 'item-3',
        title: 'Item 3',
      },
    ],
  },
  {
    id: 'container-2',
    title: 'In Progress',
    items: [
      {
        id: 'item-4',
        title: 'Item 4',
      },
      {
        id: 'item-5',
        title: 'Item 5',
      },
    ],
  },
  {
    id: 'container-3',
    title: 'Done',
    items: [
      {
        id: 'item-6',
        title: 'Item 6',
      },
      {
        id: 'item-7',
        title: 'Item 7',
      },
    ],
  },
];

export default function Home() {
  const [boardData, setBoardData] = useState<any>();
  const [containers, setContainers] = useState<DNDType[]>([]);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [currentContainerId, setCurrentContainerId] =
    useState<UniqueIdentifier>();
  const [containerName, setContainerName] = useState('');
  const [itemName, setItemName] = useState('');
  const [showAddContainerModal, setShowAddContainerModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    fetch('/api/boards/1').then((res) => res.json()).then((data) => {
      setContainers(data.containers);
      setBoardData(data);
    }
    );
  }
    , []);

  useEffect(() => {
    if (!firstRender) {
      console.log('containers inside', containers);
    }
    setFirstRender(false);
  }
    , [containers]);

  const onAddContainer = () => {
    const id = `container-${uuidv4()}`;
    setContainers([
      ...containers,
      {
        id,
        title: "New Column",
        items: [{ id: `item-${uuidv4()}`, title: "", isPlaceholder: true, labelColor: "#75D7B6" }],
      },
    ]);
    setContainerName('');
    setShowAddContainerModal(false);
    //move scroll to the top left
    const boardContainer = document.querySelector('#boardContainer')
    if(boardContainer) {
      setTimeout(
        () => {
          boardContainer.scrollBy({
            left: boardContainer.clientWidth, // Change the value to the desired scroll amount
            behavior: 'smooth' // Enables smooth scrolling behavior
          });
        }, 1 )
    }
  };

  const onAddItem = (idCol: any) => {
    const id = `item-${uuidv4()}`;
    const container = containers.find((item) => item.id === idCol);
    if (!container) return;
    container.items.push({
      id,
      title: "New task ",
    });
    setContainers([...containers]);
    setItemName('');
    setShowAddItemModal(false);
  };

  const onEditContainer = (id: UniqueIdentifier, title: string) => {
    const container = containers.find((item) => item.id === id);
    if (!container) return;
    container.title = title;
    setContainers([...containers]);
  }

  const handleEditItem = (id: UniqueIdentifier, selectItem:Item) => {
    const container = containers.find((container) =>
    container.items.find((item) => item.id === id),
    );
    if (!container) return;

    let item = container.items.find((item) => item.id === id);
    if (!item) return;
    
    item.description = selectItem.description;
    item.title = selectItem.title;
    item.labelColor = selectItem.labelColor
    //item.on

    setContainers([...containers]);
  }

  const onDeleteItem = (id: UniqueIdentifier) => {
    const container = containers.find((container) =>
      container.items.find((item) => item.id === id),
    );
    if (!container) return;
    container.items = container.items.filter((item) => item.id !== id);
    setContainers([...containers]);
  }

  const onEditBoardTitle = (title: string) => {
    setBoardData({ ...boardData, name: title });
  }

  // Find the value of the items
  function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
    if (type === 'container') {
      return containers.find((item) => item.id === id);
    }
    if (type === 'item') {
      return containers.find((container) =>
        container.items.find((item) => item.id === id),
      );
    }
  }

  const findItemTitle = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, 'item');
    if (!container) return '';
    const item = container.items.find((item) => item.id === id);
    if (!item) return '';
    return item.title;
  };

  const findItem = (id: UniqueIdentifier) => {
    const container = findValueOfItems(id, 'item');
    if (!container) return null;
    const item = container.items.find((item) => item.id === id);
    if (!item) return null;
    return item;
  }

  const findContainerTitle = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, 'container');
    if (!container) return '';
    return container.title;
  };

  const findContainerItems = (id: UniqueIdentifier | undefined) => {
    const container = findValueOfItems(id, 'container');
    if (!container) return [];
    return container.items;
  };

  // DND Handlers
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;
    setActiveId(id);
  }

  const handleDragMove = (event: DragMoveEvent) => {
    const { active, over } = event;

    // Handle Items Sorting
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('item') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active container and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'item');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id,
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id,
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id,
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id,
      );
      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex,
        );

        setContainers(newItems);
      } else {
        // In different containers
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1,
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem,
        );
        setContainers(newItems);
      }
    }

    // Handling Item Drop Into a Container
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'container');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;

      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id,
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id,
      );

      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id,
      );

      // Remove the active item from the active container and add it to the over container
      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1,
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
  };

  // This is the function that handles the sorting of the containers and items when the user is done dragging.
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    // Handling Container Sorting
    if (
      active.id.toString().includes('container') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === active.id,
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === over.id,
      );
      // Swap the active and over container
      let newItems = [...containers];
      newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
      setContainers(newItems);
    }

    // Handling item Sorting
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('item') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'item');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id,
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id,
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id,
      );
      const overitemIndex = overContainer.items.findIndex(
        (item) => item.id === over.id,
      );

      // In the same container
      if (activeContainerIndex === overContainerIndex) {
        let newItems = [...containers];
        newItems[activeContainerIndex].items = arrayMove(
          newItems[activeContainerIndex].items,
          activeitemIndex,
          overitemIndex,
        );
        setContainers(newItems);
      } else {
        // In different containers
        let newItems = [...containers];
        const [removeditem] = newItems[activeContainerIndex].items.splice(
          activeitemIndex,
          1,
        );
        newItems[overContainerIndex].items.splice(
          overitemIndex,
          0,
          removeditem,
        );
        setContainers(newItems);
      }
    }
    // Handling item dropping into Container
    if (
      active.id.toString().includes('item') &&
      over?.id.toString().includes('container') &&
      active &&
      over &&
      active.id !== over.id
    ) {
      // Find the active and over container
      const activeContainer = findValueOfItems(active.id, 'item');
      const overContainer = findValueOfItems(over.id, 'container');

      // If the active or over container is not found, return
      if (!activeContainer || !overContainer) return;
      // Find the index of the active and over container
      const activeContainerIndex = containers.findIndex(
        (container) => container.id === activeContainer.id,
      );
      const overContainerIndex = containers.findIndex(
        (container) => container.id === overContainer.id,
      );
      // Find the index of the active and over item
      const activeitemIndex = activeContainer.items.findIndex(
        (item) => item.id === active.id,
      );

      let newItems = [...containers];
      const [removeditem] = newItems[activeContainerIndex].items.splice(
        activeitemIndex,
        1,
      );
      newItems[overContainerIndex].items.push(removeditem);
      setContainers(newItems);
    }
    setActiveId(null);
  }

  return (
    <div className="bg-[#cde0e0] bg-cover max-h-[100vh - 250px]"
      style={{
        backgroundImage: `url(${boardData?.background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        maxHeight: 'calc(100vh - 50px)',
        overflow: 'hidden',
      }}
    >

      <div className="wide-container flex items-center justify-between gap-y-2 bg-slate-50/80">
        <h1 className="text-gray-800 text-base font-medium pl-1 flex items-center gap-2 md:ml-1">
          <KanbanSquare width={"19px"}/>
          {boardData?.name }
        </h1>
        <Toolsection addContainer={onAddContainer} onEditBoardTitle={onEditBoardTitle} board={boardData}/>
      </div>
      <div className="mt-5">
        <div id="boardContainer" className=" w-full min-h-screen inline-grid grid-flow-col auto-cols-min gap-8 overflow-x-auto pt-1 px-[40px]">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragMove={handleDragMove}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={containers.map((i) => i.id)}>
              {containers.map((container) => (
                <Container
                  id={container.id}
                  title={container.title}
                  key={container.id}
                  onAddItem={() => {
                    setCurrentContainerId(container.id);
                    onAddItem(container.id)
                  }}
                  number={container.items.length}
                  editContainer={onEditContainer}
                >
                  <SortableContext items={container.items.map((i) => i.id)}>
                    <div className="flex items-start min-h-[100px] flex-col gap-y-2 overflow-scroll p-1 items-container"
                      style={{ maxHeight: "calc(74vh - 20px)" }}
                    >
                      {container.items.map((i) => (
                        <Items
                          onEditItem={handleEditItem}
                          onDeleteItem={onDeleteItem}
                          item = {i}
                          title={i.title} id={i.id} key={i.id}
                          labelColor={i.labelColor}
                          isPlaceholder={i.isPlaceholder} />
                      ))}
                    </div>
                  </SortableContext>
                </Container>
              ))}
            </SortableContext>
            <DragOverlay adjustScale={false}>
              {/* Drag Overlay For item Item */}
              {activeId && activeId.toString().includes('item') && (
                <Items onEditItem={handleEditItem} id={activeId} title={""} item = {findItem(activeId)} onDeleteItem={onDeleteItem}/>
              )}
              {/* Drag Overlay For Container */}
              {activeId && activeId.toString().includes('container') && (
                <Container id={activeId}
                  title={findContainerTitle(activeId)}
                  editContainer={onEditContainer}
                  number={findValueOfItems(activeId, 'container')?.items.length}
                >
                  <div className="flex items-start min-h-[100px] flex-col gap-y-2 overflow-scroll p-1 items-container"
                    style={{ maxHeight: "calc(74vh - 20px)" }}
                  >
                    {findContainerItems(activeId).map((i) => (
                      <Items onEditItem={handleEditItem} key={i.id} title={i.title} id={i.id} isPlaceholder={i.isPlaceholder} item={i} onDeleteItem={onDeleteItem} />
                    ))}
                  </div>
                </Container>
              )}
            </DragOverlay>
          </DndContext>
          <div>
            <div
              className=" justify-center items-center mt-[1px] h-[60px] w-[300px] min-w-[300px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2 bg-slate-50/30 text-sm opacity-70 hover:opacity-100"
              onClick={onAddContainer}>
              <Plus className='h-5 opacity-80' />
              Add Container
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

const Toolsection = (
    {addContainer, onEditBoardTitle, board}:{addContainer:()=>void, onEditBoardTitle: (el:string) => void, board: any} ) => {
  return (
    <>
      <div className="flex items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div onClick={addContainer} className='p-3 cursor-pointer'>
                <Plus />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Add column</p>
            </TooltipContent>
          </Tooltip>
          <Popover>
            <PopoverTrigger>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className='p-3'>
                    <Settings />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Change settings</p>
                </TooltipContent>
              </Tooltip>
            </PopoverTrigger>
            <PopoverContent className='backdrop-blur-md bg-white/70'>
              {
                // Board Setting Form
              }
              <BoardSettingForm onEditBoardTitle={onEditBoardTitle} board={board} />
            </PopoverContent>
          </Popover>
        </TooltipProvider >
      </div>
    </>
  )
}
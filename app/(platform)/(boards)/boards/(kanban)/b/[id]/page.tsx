"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
// DnD
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
} from '@dnd-kit/sortable';

import Container from './components/Container';
import Items from './components/Item';
import { KanbanSquare, Palette, Plus, Radio, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Item, DNDType, Background } from './types';
import { BoardSettingForm } from './components/Forms/BoardSettingForm';
import { BoardThemeSettings } from './components/Forms/BoardThemeSettings';
import { getCookie } from 'cookies-next';
import { Pomodoro } from './components/Pomodoro';
import { useGetBackgrounds } from '@/hooks/useGetBackgrounds';
import useChannel from '@/hooks/useChannel';
import { useDebounce } from '@/hooks/useDebounce';
import { API_URL } from '@/helpers/contrants';


const UNIQUE_ID = uuidv4();


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

  const updatedContainers = useDebounce(containers, 2000)

  const [firstRender, setFirstRender] = useState(true);

  const slug = useParams();
  const cookie = getCookie("token_2sl");

  const [value, setValue] = useState(0);

  const { broadcast } = useChannel<any>({
    channelName: "count-channel" + slug.id,
    messageHandler: (msg: any) => {
      console.log(msg);
      setContainers(msg.data);
    },
  });

  //useGetProject(slug.id);
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Authorization", "Bearer " + cookie);

    var requestOptions: any = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(API_URL + `/projects/${slug.id}`, requestOptions).then((res) => res.json()).then((res) => {
      setContainers(JSON.parse(res.data.project.containers));
      setBoardData(res.data.project);
    }
    );
  }
    , []);

  useEffect(() => {
    if (!firstRender) {
      updateData({ slug: slug.id, containers: containers });
    }
    setFirstRender(false);
  }
    , [updatedContainers]);

  useEffect(() => {
    if (boardData) {
      onUpdateBoardInfo({ slug: slug.id, boardData });
    }
  }
    , [boardData]);

  const onUpdateBoardInfo = async ({ slug, boardData }: { slug: any, boardData: any }) => {
    var myHeaders: any = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Bearer " + cookie);

    let urlencoded: any = new URLSearchParams();
    urlencoded.append("name", boardData.name);
    urlencoded.append("description", boardData.description);
    urlencoded.append("background_id", boardData.background?.id);

    let requestOptions: any = {
      method: 'PUT',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch(API_URL + "/projects/" + slug, requestOptions)
      .then(response => response.text())
      .then(result => '')
      .catch(error => console.log('error', error));

  }

  const onUpdateTime = async ({ slug, body }: { slug: any, body: any }) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + cookie);
    
    var raw = JSON.stringify({
      "time": body.time
    });
    
    var requestOptions:any = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(API_URL + "/projects/"+slug+"/time", requestOptions)
      .then(response => response.text())
      .catch(error => console.log('error', error));
  }

  //Server Uodate
  const updateData = ({ slug, containers }: { slug: string | any, containers: any }) => {
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + cookie);

    var raw = JSON.stringify({ "containers": containers });

    var requestOptions: any = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(API_URL + `/projects/${slug}/containers`, requestOptions)
      .then(response => response.text())
      .catch(error => console.log('error', error));
  }


  const onAddContainer = () => {
    const id = `container-${uuidv4()}`;
    setContainers([
      ...containers,
      {
        id,
        title: "New Column",
        items: [{ id: `item-${uuidv4()}`, title: "", isPlaceholder: true, labelColor: "#75D7B6", dueDate: "", description: "" }],
      },
    ]);
    setContainerName('');
    setShowAddContainerModal(false);
    //move scroll to the top left
    const boardContainer = document.querySelector('#boardContainer')
    if (boardContainer) {
      setTimeout(
        () => {
          boardContainer.scrollBy({
            left: boardContainer.clientWidth, // Change the value to the desired scroll amount
            behavior: 'smooth' // Enables smooth scrolling behavior
          });
        }, 1)
    }
  };

  const onRemoveContainer = (id: UniqueIdentifier) => {
    const container = containers.find((item) => item.id === id);
    if (!container) return;
    const newContainers = containers.filter((item) => item.id !== id);
    let newArchiveItems;
    if (boardData.archive) {
      newArchiveItems = [...boardData.archive, ...container.items.filter(item => item.isPlaceholder !== false)]
    } else {
      newArchiveItems = container.items
    }

    setContainers([...newContainers]);
    console.log("Board Data", boardData)
    setBoardData({ ...boardData, archive: newArchiveItems });
    //setBoardData({ ...boardData, archive: [...boardData.archive, container]});
  }

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

  const handleEditItem = (id: UniqueIdentifier, selectItem: Item) => {
    const container = containers.find((container) =>
      container.items.find((item) => item.id === id),
    );
    if (!container) return;

    let item = container.items.find((item) => item.id === id);
    if (!item) return;

    item.description = selectItem.description;
    item.title = selectItem.title;
    item.labelColor = selectItem.labelColor
    item.dueDate = selectItem.dueDate;
    item.status = selectItem.status;
    item.labels = selectItem.labels;

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

  const onEditBackground = (background: Background) => {
    setBoardData({ ...boardData, background: background });
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
        backgroundImage: `url(${boardData?.background?.url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        maxHeight: 'calc(100vh - 50px)',
        overflow: 'hidden',
      }}
    >

      <div className="wide-container flex items-center justify-between gap-y-2 bg-slate-50/70 backdrop-blur-sm relative z-50">
        <div className="card">
          <button onClick={() => broadcast(containers)}>
            <Radio />
          </button>
        </div>
        <h1 className="text-gray-800 text-base font-medium pl-1 flex items-center gap-2 md:ml-1">
          <KanbanSquare width={"19px"} />
          {boardData?.name}
        </h1>
        <Pomodoro data={boardData} onUpdateTime={onUpdateTime} />

        <Toolsection
          addContainer={onAddContainer}
          onEditBoardTitle={onEditBoardTitle}
          board={boardData}
          onEditBackground={onEditBackground}
        />
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
                  onRemoveContainer={() => {
                    onRemoveContainer(container.id)
                  }}
                  number={container.items?.length}
                  editContainer={onEditContainer}
                >
                  <SortableContext items={container.items?.map((i) => i.id)}>
                    <div className="flex items-start min-h-[100px] flex-col gap-y-2 overflow-scroll p-1 items-container"
                      style={{ maxHeight: "calc(74vh - 20px)" }}
                    >
                      {container.items?.map((i) => (
                        <Items
                          onEditItem={handleEditItem}
                          onDeleteItem={onDeleteItem}
                          item={i}
                          title={i.title} id={i.id} key={i.id}
                          labelColor={i.labelColor}
                          isPlaceholder={i.isPlaceholder} 
                          dueDate={i.dueDate}
                          status={i.status}
                          />
                      ))}
                    </div>
                  </SortableContext>
                </Container>
              ))}
            </SortableContext>
            <DragOverlay adjustScale={false}>
              {/* Drag Overlay For item Item */}
              {activeId && activeId.toString().includes('item') && (
                <Items onEditItem={handleEditItem} id={activeId} title={""} item={findItem(activeId)} onDeleteItem={onDeleteItem}  />
              )}
              {/* Drag Overlay For Container */}
              {activeId && activeId.toString().includes('container') && (
                <Container id={activeId}
                  title={findContainerTitle(activeId)}
                  editContainer={onEditContainer}
                  onRemoveContainer={
                    () => {
                      onRemoveContainer(activeId)
                    }
                  }
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
              className=" justify-center items-center mt-[1px] h-[60px] w-[300px] min-w-[300px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2 bg-slate-50/60 text-sm opacity-90 hover:opacity-100 font-medium backdrop-blur-sm"
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
  { addContainer, onEditBoardTitle, board, onEditBackground }:
    { addContainer: () => void, onEditBoardTitle: (el: string) => void, board: any, onEditBackground: (bd: Background) => void, }) => {
  const cookies = getCookie("token_2sl");
  const backgeroundList = useGetBackgrounds(cookies);
  return (
    <>
      <div className="flex items-center">
        <TooltipProvider>
          {
            /*
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
          */
          }
          <Popover>
            <PopoverTrigger>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div onClick={() => console.log("edit backgeround")} className='p-3 cursor-pointer'>
                    <Palette />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Edit background</p>
                </TooltipContent>
              </Tooltip>
            </PopoverTrigger>
            <PopoverContent className='backdrop-blur-md bg-white/80'>
              <BoardThemeSettings
                onEditBackground={onEditBackground}
                background={board?.background}
                backgroundList={backgeroundList}
              />
            </PopoverContent>
          </Popover>

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
            <PopoverContent className='backdrop-blur-md bg-white/80'>
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

const useGetProject = (slug: any) => {
  const [project, setProject] = useState<any>(null);
  const cookie = getCookie("token_2sl");

  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", "Bearer " + cookie);

  var requestOptions: any = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  useEffect(() => {
    fetch(API_URL + "/projects/18a1ffd0-76b4-4c62-a2b5-2a4bf957868a", requestOptions)
      .then(response => response.json())
      .then(result => {
        setProject(result.data.project)
      })
      .catch(error => console.log('error', error));
  }, [slug])

  return {
    containers: project
  }
}
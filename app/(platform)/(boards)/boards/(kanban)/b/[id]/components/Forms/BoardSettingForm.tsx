import React, { useState } from "react"

import { Pencil, Trash2 } from "lucide-react"
import { Item } from "../../types"

/*
    Update board name API
    : if response is ok, update board name in state
    : else, show error message
*/


export const BoardSettingForm = ({ onEditBoardTitle, board }: { onEditBoardTitle: (el: string) => void, board: any }) => {
    const [isEditingName, setIsEditingName] = useState(false)
    const [boardName, setBoardName] = useState(board.name)
    return (
        <div className="grid gap-4 text-sm">
            <div className="space-y-2">
                <h4 className="font-medium text-base leading-none">Board Settings</h4>
                <p className="text-muted-foreground">
                    Change the basic settings of your board.
                </p>

                {!isEditingName ? (
                    <>
                        <div className="flex items-center justify-between border rounded px-2 py- h-10">
                            <span className=" font-medium">
                                {boardName}
                            </span>
                            <span className="cursor-pointer py-1 px-1 rounded-full opacity-80 hover:bg-slate-300/30"
                                onClick={() => setIsEditingName(true)}>
                                <Pencil width={16} height={16} />
                            </span>
                        </div>
                    </>)
                    : (
                        <div className="flex items-center justify-between border rounded h-10">
                            <input type="text"
                                className="w-full h-full px-2 py-2"
                                value={boardName}
                                onChange={e => setBoardName(e.target.value)}
                                onKeyDown={el => {
                                    if (el.key === 'Enter') {
                                        setIsEditingName(false)
                                        onEditBoardTitle(boardName)
                                    }
                                }
                                }
                                autoFocus onBlur={() => {
                                    setIsEditingName(false)
                                    onEditBoardTitle(boardName)
                                }
                                } />
                        </div>
                    )
                }

            </div>
            {
                //Delete button
            }
            <div className="hidden">
                <h3 className=" text-rose-600 cursor-pointer py-1 flex items-center gap-2 w-fit">
                    <Trash2 width={16} height={16} />
                    Delete board
                </h3>
            </div>
        </div>
    )
}


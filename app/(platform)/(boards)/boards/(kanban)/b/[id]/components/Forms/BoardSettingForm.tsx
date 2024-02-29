import React, { useState } from "react"

import { Pencil, Trash2 } from "lucide-react"
import { Item } from "../../types"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
            <DeleteDialog />
        </div>
    )
}


const DeleteDialog = () => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="hover:bg-slate-200" >
                    <h3 className=" text-rose-600 cursor-pointer py-1 flex items-center gap-2 w-fit">
                        <Trash2 width={16} height={16} />
                        Delete board
                    </h3>
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>

                            This action cannot be undone. This will permanently delete your
                            board and remove your data from our servers.
                        </p>

                        <p className="my-4">
                            If you what to delete this board, please type the name of the board below.
                        </p>

                        <Input/>

                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

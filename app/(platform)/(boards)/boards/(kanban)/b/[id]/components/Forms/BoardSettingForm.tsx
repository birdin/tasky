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
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
import { useDelete } from "@/hooks/useDelete"
import { API_URL } from "@/helpers/contrants"

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
            <DeleteDialog boardName={boardName} slug={board.slug} />
        </div>
    )
}


const DeleteDialog = ({ boardName, slug }: { boardName: string | undefined, slug: string | undefined }) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [value, setValue] = useState<string>("")
    const cookies = 'cookies'

    const router = useRouter()

    if (isDeleted && !isLoading) {
        toast.success("Board deleted successfully")
        router.push("/boards")
    }

    if (error) {
        toast.error(`Error deleting board ${error}`)
    }


    const handleDelete = async () => {
        const myHeaders = new Headers();
        if(!cookies || !slug) return

        myHeaders.append("Accept", "application/json");
        myHeaders.append("Authorization", "Bearer " + cookies);
    
    
        const requestOptions: any = {
            method: "DELETE",
            headers: myHeaders,
            redirect: "follow"
        };


        setIsLoading(true)
        fetch(API_URL + "/projects/" + boardName, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                
                if(result.message === "Project deleted"){
                    setIsDeleted(true)
                } else {
                    setError(result.message)
                }
            })
            .catch((error) => {
                console.error(error)
                setError(error)
            }).finally(() => {
                setIsLoading(false)
            }
            );
    }


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
                    <AlertDialogTitle className="flex items-center gap-2">
                        <Trash2 size={'1.2rem'} />
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        <p>
                            This action cannot be undone. This will permanently delete your
                            board and remove your data from our servers.
                        </p>

                        <p className="my-4">
                            If you what to delete this board, please type the name of the board below: "<b>{boardName}</b>".
                        </p>

                        <Input value={value} onChange={el => setValue(el.target.value)} />

                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {
                        value === boardName ? (
                            <AlertDialogAction className="inactive bg-[--main-color]" onClick={() => handleDelete()}>Continue</AlertDialogAction>
                        ) : <button disabled className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 inactive bg-[--main-color]">Continue</button>
                    }
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

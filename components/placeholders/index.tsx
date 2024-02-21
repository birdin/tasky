import React from 'react'

type Props = {}

export const BoardsSkeleton = (props: Props) => {
    return (
        <div className="">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="animate-pulse mt-6">
                    <div className="rounded bg-slate-200 h-10 w-full max-w-[30rem]"></div>
                    <div className="flex flex-col gap-2 mt-3">
                        <div className="h-6 w-full max-w-[10rem] bg-slate-200 rounded"></div>
                        <div className="h-6 w-full max-w-[20rem] bg-slate-200 rounded"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
                        <div className="h-32 bg-slate-200 rounded"></div>
                        <div className="h-32 bg-slate-200 rounded"></div>
                        <div className="h-32 bg-slate-200 rounded"></div>
                        <div className="h-32 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const BoardsItemsSkeleton = () => {
    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mt-4">
            <div className="h-32 bg-slate-200 rounded"></div>
            <div className="h-32 bg-slate-200 rounded"></div>
            <div className="h-32 bg-slate-200 rounded"></div>
            <div className="h-32 bg-slate-200 rounded"></div>
        </div>
    )
}

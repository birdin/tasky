import { useState } from "react"
import { Label } from "../../types"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tags, X } from "lucide-react"

export const TagsSelect = (
    { labelsValue, setUpdatedItem, updatedItem }
        : { labelsValue: any, setUpdatedItem: any, updatedItem: any }) => {
    const [value, setValue] = useState('')
    const [tags, setTags] = useState<Label[]>(labelsValue || [])

    const handleOnChange = (e: any) => {
        setValue(e.target.value)
    }

    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            if (value === '') return;
            const newTag = { id: Math.random().toString(), title: value }
            setUpdatedItem({ ...updatedItem, labels: [...tags, newTag] })
            setTags([...tags, newTag])
            setValue('')
        }

    }

    const removeItem = (index: number) => {
        const newList = tags.filter(el => tags.indexOf(el) !== index)
        setUpdatedItem({ ...updatedItem, labels: newList })
        setTags(newList)
    }

    return (
        <div className=''>
            <Popover>
                <PopoverTrigger asChild>
                    {
                        tags?.length > 0 ? (
                            <div className="flex items-center gap-1">
                                {
                                    tags?.map((tag, index) => {
                                        return (
                                            <label key={`tag-${index}`} className='bg-sky-200 text-sky-800 text-[13px] px-3 rounded capitalize border border-sky-400'>
                                                {tag.title}
                                            </label>
                                        )
                                    }
                                    )
                                }
                            </div>
                        ) : (
                            <div className='text-sm text-muted-foreground flex items-center gap-2'>
                                <Tags className="h-4 w-4" />
                                Add tags
                            </div>
                        )
                    }
                </PopoverTrigger>
                <PopoverContent>
                    <div>
                        <h4 className="font-medium text-base leading-none">List of tags</h4>
                        <div>
                            <div className="flex items-center gap-1 mt-2">
                                <input type="text"
                                    className='justify-between border rounded px-2 h-8 w-full text-sm'
                                    placeholder="Add new tag"
                                    onChange={handleOnChange}
                                    value={value}
                                    onKeyDown={handleEnter} />
                                <div className="w-12 h-8 p-[5px] border rounded">
                                    <div className="p-2 h-full bg-red-500">

                                    </div>
                                </div>
                            </div>
                            <ul className='py-2'>
                                {tags?.map((tag, index) => {
                                    return (
                                        <li key={`tag-${index}`} className='flex items-center justify-between py-2'>
                                            <span>
                                                {tag.title}
                                            </span>
                                            <span>
                                                <X
                                                    className='h-4 w-4 cursor-pointer'
                                                    onClick={() => removeItem(index)}
                                                />
                                            </span>
                                        </li>
                                    )
                                }
                                )}
                            </ul>
                        </div>
                    </div>
                </PopoverContent>

            </Popover>
        </div>
    )
}

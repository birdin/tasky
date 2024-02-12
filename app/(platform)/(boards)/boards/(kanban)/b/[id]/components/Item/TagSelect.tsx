import { useState } from "react"
import { Label } from "../../types"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tags, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { set } from "date-fns"

export const TagsSelect = (
    { labelsValue, setUpdatedItem, updatedItem }
        : { labelsValue: any, setUpdatedItem: any, updatedItem: any }) => {
    const [value, setValue] = useState('')
    const [color, setColor] = useState('red' as string)
    const [tags, setTags] = useState<Label[]>(labelsValue || [])

    const handleOnChange = (e: any) => {
        setValue(e.target.value)
    }

    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            if (value === '') return;
            const newTag = { id: Math.random().toString(), title: value, color: color}
            setUpdatedItem({ ...updatedItem, labels: [...tags, newTag] })
            setTags([...tags, newTag])
            setValue('')
            setColor('red')
        }
    }

    const handleColor = (newColor: string) => {
        setColor(newColor)
        console.log('newColor', newColor)
        console.log(updatedItem)
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
                                            <label key={`tag-${index}`} className={`bg-${tag.color}-500/50 text-silver-900 text-[13px] px-3 rounded capitalize border border-sky-400`}>
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
                <PopoverContent align="start">
                    <div>
                        <div>
                            <div className="flex items-center gap-1">
                                <input type="text"
                                    className='justify-between border rounded px-2 h-8 w-full text-sm'
                                    placeholder="Add new tag"
                                    autoFocus={false}
                                    onChange={handleOnChange}
                                    value={value}
                                    onKeyDown={handleEnter} />
                                <SelectColor color={color} setColor={(el:string) => handleColor(el)} />
                            </div>
                            <ul className='py-2'>
                                {tags?.map((tag, index) => {
                                    return (
                                        <li key={`tag-${index}`} className='flex items-center justify-between py-2 text-sm'>
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


const COLOR = [
    { name: 'red', color: 'bg-red-500' },
    { name: 'blue', color: 'bg-blue-500' },
    { name: 'green', color: 'bg-green-500' },
    { name: 'yellow', color: 'bg-yellow-500' },
    { name: 'indigo', color: 'bg-indigo-500' },
    { name: 'pink', color: 'bg-pink-500' },
    { name: 'purple', color: 'bg-purple-500' },
    { name: 'gray', color: 'bg-gray-500' },
    { name: 'teal', color: 'bg-teal-500' },
]

const SelectColor = (
    { setColor, color }
        : { setColor: any, color: string }) => {
    const [selectedColor, setSelectedColor] = useState( COLOR.find(el=>el.name == color)?.color || 'bg-gray-500')
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="w-10 h-8 p-[6px] border rounded">
                    <div className={`p-2 h-full ${
                        selectedColor
                    }`}>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuLabel>Select label color</DropdownMenuLabel>
                {
                    COLOR.map((el, index) => {
                        return (
                            <div key={`color-${index}`} 
                                className={`text-sm my-1 gap-2 h-8 p-[6px] flex items-center border rounded cursor-pointer ${selectedColor === el.color ? ' border-blue-400 border-2' : ''}`}
                                onClick={() => {
                                    setColor(COLOR.find(el=>el.color == el.color)?.name || 'gray')
                                    setSelectedColor(el.color)
                                }}>
                                <div className={`p-2 h-full w-6 ${el.color}`}>
                                </div>
                                <span className="capitalize">
                                    {el.name}
                                </span>
                            </div>
                        )
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
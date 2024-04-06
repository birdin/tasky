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
    const [color, setColor] = useState('red')
    const [tags, setTags] = useState<Label[]>(labelsValue || [])

    const handleOnChange = (e: any) => {
        setValue(e.target.value)
    }

    const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
            if (value === '') return;
            const newTag = { id: Math.random().toString(), title: value, color: color}
            console.log("Color", color )
            setUpdatedItem({ ...updatedItem, labels: [...tags, newTag] })
            setTags([...tags, newTag])
            setValue('')
            setColor('red')
        }
    }

    const handleColor = (newColor: string) => {
        setColor(newColor)
        console.log('New Color here', newColor)
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
                            <div className="flex items-center gap-1 flex-wrap">
                                {
                                    tags?.map((tag, index) => {
                                        return (
                                            <label key={`tag-${index}`} 
                                                className={`bg-${tag.color}-200 text-${tag.color}-800 text-[13px] px-3 rounded capitalize border border-${tag.color}-400`}>
                                                {tag.title}
                                            </label>
                                        )
                                    }
                                    )
                                }
                            </div>
                        ) : (
                            <div className='text-sm text-muted-foreground flex items-center gap-2 cursor-pointer'>
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
    { name: 'sky', color: 'bg-sky-500' },
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
                                    setColor(el.name)
                                    setSelectedColor(el.color)
                                }}>
                                <div className={`p-2 h-full w-6 ${el.color}`}>
                                </div>
                                <span className={`bg-${el.name}-500/50`}></span>
                                <span className="capitalize">
                                    {el.name}
                                </span>
                            </div>
                        )
                    })
                }
                <div className="hidden">
                    <span className="bg-red-200"></span>
                    <span className="border-red-400"></span>
                    <span className="text-red-800"></span>
                    <span className="bg-sky-200"></span>
                    <span className="border-sky-400"></span>
                    <span className="text-sky-800"></span>
                    <span className="bg-pink-200"></span>
                    <span className="border-pink-400"></span>
                    <span className="text-pink-800"></span>
                    <span className="bg-yellow-200"></span>
                    <span className="border-yellow-400"></span>
                    <span className="bg-green-200"></span>
                    <span className="border-green-400"></span>
                    <span className="bg-indigo-200"></span>
                    <span className="border-indigo-400"></span>
                    <span className="bg-purple-200"></span>
                    <span className="border-purple-400"></span>
                    <span className="bg-gray-200"></span>
                    <span className="border-gray-400"></span>
                    <span className="bg-teal-200"></span>
                    <span className="border-teal-400"></span>

                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
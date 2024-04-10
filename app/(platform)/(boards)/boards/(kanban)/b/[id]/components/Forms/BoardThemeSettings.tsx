import React from 'react';

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const urlOptions = [
    {
        id: "bg-1",
        value: "bg-1",
        url: "https://artefeed.com/wp-content/uploads/2024/04/default-bg.jpg",
        thumb: "https://artefeed.com/wp-content/uploads/2024/04/default-bg-thumb.jpg"
    },
    {
        id: "bg-2",
        value: "bg-2",
        url: "https://images.unsplash.com/photo-1702529939203-04c666ee2b7f?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb: "https://images.unsplash.com/photo-1702529939203-04c666ee2b7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTl8fHxlbnwwfHx8fHw%3D"
    },
    {
        id: "bg-3",
        value: "bg-3",
        url: "https://images.unsplash.com/photo-1696118467262-687607f0d834?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb: "https://images.unsplash.com/photo-1696118467262-687607f0d834?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjN8fHxlbnwwfHx8fHw%3D"
    },
    {
        id: "bg-4",
        value: "bg-4",
        url: "https://images.unsplash.com/photo-1630868499424-b38f9f885d66?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb: "https://images.unsplash.com/photo-1630868499424-b38f9f885d66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDY3fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D"
    },
    {
        id: "bg-5",
        value: "bg-5",
        url: "https://images.unsplash.com/photo-1521080755838-d2311117f767?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb: "https://images.unsplash.com/photo-1521080755838-d2311117f767?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D"
    },
    {
        id: "bg-6",
        value: "bg-6",
        url: "https://images.unsplash.com/photo-1459535653751-d571815e906b?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb: "https://images.unsplash.com/photo-1459535653751-d571815e906b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTB8fHxlbnwwfHx8fHw%3D"
    },
    {
        id: "bg-7",
        value: "bg-7",
        url: "https://images.unsplash.com/photo-1634693798046-b00e706c3076?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb: "https://images.unsplash.com/photo-1634693798046-b00e706c3076?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwcm9maWxlLXBhZ2V8MTJ8fHxlbnwwfHx8fHw%3D"
    },
    {
        id: "bg-8",
        value: "bg-8",
        url: "https://images.unsplash.com/photo-1703002917693-e51692232c81?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        thumb: "https://images.unsplash.com/photo-1703002917693-e51692232c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNzA0MjE1Mjg0fA&ixlib=rb-4.0.3&q=80&w=200&quot"
    },
]

type Props = {
    onEditBackground: (value: any) => void;
    background: { id: string, value: string, url: string, thumb: string };
    backgroundList: { backgrounds: any, loading: boolean, error: any };
}
export const BoardThemeSettings = ({ onEditBackground, background, backgroundList }: Props) => {
    const [selected, setSelected] = React.useState(background)
    //const cookie = getCookie("token_2sl");
    const { backgrounds, loading, error } = backgroundList;
    //const { backgrounds, loading, error } = useGetBackgrounds(cookie);

    const handleSelect = (value: string) => {
        const resp = urlOptions.find(el => el.value === value)
        console.log(resp)
        if (resp) {
            onEditBackground(resp)
            setSelected(resp)
        }
    }
    return (
        <div className="grid gap-4 text-sm">
            <div className="space-y-2">
                <h4 className="font-medium text-base leading-none">Background and theme</h4>
                <p className="text-muted-foreground">
                    Define the background and theme of your board.
                </p>

                {loading ? <p>Loading...</p> :
                    <RadioGroup defaultValue="default" value={selected.value} onValueChange={handleSelect} className="grid grid-cols-3 gap-1  bg-stone-50/30 underline-offset-2">
                        {
                            backgrounds.map((el: any) => (
                                <BackGroundRadioItem key={`bg-${el.id}`} value={el.value} id={el.id}>
                                    <div className="h-full" onClick={() => onEditBackground(el)}>
                                        <img src={el.thumb} className="h-full rounded object-cover" />
                                    </div>
                                </BackGroundRadioItem>
                            ))
                        }
                    </RadioGroup>
                }
            </div>
        </div>
    )
}

const BackGroundRadioItem = ({ value, id, children }: { value: string, id: string, children?: any }) => {
    return (
        <div className="overflow-hidden h-14">
            <RadioGroupItem value={value} id={id} className="peer sr-only" />
            <Label
                htmlFor={id}
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-zinc-500 [&:has([data-state=checked])]:border-zinc-500 h-full w-full"
            >
                {children}
            </Label>
        </div>
    )
}

function useGetCookie(arg0: string) {
    throw new Error('Function not implemented.')
}

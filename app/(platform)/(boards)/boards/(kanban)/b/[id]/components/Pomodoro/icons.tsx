export function PlayIcon({ size }: { size: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill="none"
            viewBox="0 0 50 50"
        >
            <path
                fill="#7B9786"
                d="M33.625 22.573a2.75 2.75 0 010 4.853l-11.744 6.387c-1.891 1.03-4.214-.31-4.214-2.426V18.613c0-2.117 2.323-3.454 4.214-2.427l11.744 6.387z"
            ></path>
            <circle
                cx="25"
                cy="25"
                r="23.5"
                stroke="#F0F0F0"
                strokeWidth="3"
            ></circle>
        </svg>
    );
}

export function PauseIcon({ size }: { size: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill="none"
            viewBox="0 0 50 50"
        >
            <path
                fill="#708B96"
                d="M33.25 17.313v14.375c0 .38-.158.746-.44 1.016-.28.27-.662.421-1.06.421H28c-.398 0-.78-.151-1.06-.421a1.408 1.408 0 01-.44-1.017V17.313c0-.38.158-.746.44-1.016.28-.27.662-.421 1.06-.421h3.75c.398 0 .78.151 1.06.421.282.27.44.635.44 1.017zM22 15.874h-3.75c-.398 0-.78.151-1.06.421-.282.27-.44.635-.44 1.017v14.375c0 .38.158.746.44 1.016.28.27.662.421 1.06.421H22c.398 0 .78-.151 1.06-.421.282-.27.44-.635.44-1.017V17.313c0-.38-.158-.746-.44-1.016a1.534 1.534 0 00-1.06-.421z"
            ></path>
            <circle
                cx="25"
                cy="25"
                r="23.5"
                stroke="#F0F0F0"
                strokeWidth="3"
            ></circle>
        </svg>
    );
}


export function StopIcon({ size }: { size: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            fill="none"
            viewBox="0 0 50 50"
        >
            <path
                fill="#A3AFB4"
                d="M20.5 17h10c1.375 0 2.5 1.125 2.5 2.5v10c0 1.375-1.125 2.5-2.5 2.5h-10a2.507 2.507 0 01-2.5-2.5v-10c0-1.375 1.125-2.5 2.5-2.5z"
            ></path>
            <circle
                cx="25"
                cy="25"
                r="23.5"
                stroke="#F0F0F0"
                strokeWidth="3"
            ></circle>
        </svg>
    );
}

export const Container = ({ children, width }: { children: React.ReactNode, width: string | null }) => {
    if (!width) {
        return (
            <div className="mx-auto px-4 sm:px-6 md:px-8">
                {children}
            </div>
        )
    }
    
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {children}
        </div>
    )
}
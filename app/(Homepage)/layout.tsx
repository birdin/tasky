export default function HomePage({ children }: { children: React.ReactNode }) {
    return (
        <>
        <header className="flex justify-between items-center px-4 sm:px-6 md:px-8">
            <h1>
                <a href="/">Tasky</a>
            </h1>
            <nav className="flex items-center gap-2">
                <a href="/signin">Signin</a>
                <a href="/signup">Get it for free</a>
            </nav>
        </header>
        <main>
            {children}
        </main>
        <footer>

        </footer>
        </>

        /*
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {children}
        </main>
        */
    )
}
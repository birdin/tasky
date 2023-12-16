import { HomepageNavbar } from "@/components/Navbar"

export default function HomePage({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HomepageNavbar />
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
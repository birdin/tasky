import { Container } from "@/components/ui";

export const Navbar = () => {
    return (
        <header className="bg-white shadow">
            <Container width="full">
                <div className="flex items-center justify-between">
                    <h1>TASKY</h1>
                    <div className="flex">
                        <p><a href="">Profile</a></p>
                        <a href="">Sign out</a>
                    </div>
                </div>
            </Container>
        </header>
    )
}
import ProjectLists from "./components/ProjectLists";
import { Container } from "@/components/ui";
import GreetingMessage from "./components/GreetingMessage";

const BoardPage = async () => {

    return (
        <>
            <Container>
                <main className="mt-8">
                    <GreetingMessage />
                    <div className="mt-6">
                        <ProjectLists />
                    </div>
                </main>
            </Container>
        </>
    )
}

export default BoardPage
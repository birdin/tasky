import { Suspense } from "react";
import ProjectLists from "./components/ProjectLists";
import { Container } from "@/components/ui";

const BoardPage = async () => {

    return (
        <>
            <Container>
                <main className="mt-8">
                    <h1 className="text-2xl md:text-3xl font-semibold">
                        Good evening, Carlos Araiza!
                    </h1>
                    <div className="mt-6">
                        <ProjectLists />
                    </div>
                </main>
            </Container>
        </>
    )
}

export default BoardPage
import { getPosts } from "@/lib/api";
import ProjectLists from "./components/ProjectLists";


const BoardPage = async () => {
    //const el = await getPosts();
    //console.log(el);
    return (
        <>
            <div>Hey there</div>
            <ProjectLists />
        </>
    )
}

export default BoardPage
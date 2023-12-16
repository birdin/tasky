import { Container } from "@/components/ui";
import { Navbar } from "@/components/Navbar";

export default function AuthLa({ children }: { children: React.ReactNode }) {
    return (
        <>  
            <Navbar />
            {children}
        </>
    )
}
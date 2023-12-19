import { Container } from "@/components/ui";
import { Navbar } from "@/components/Navbar";
import { Providers } from "../providers";

export default function AuthLayour({ children }: { children: React.ReactNode }) {
    return (
        <>  
        <Providers>
            {children}
        </Providers>
        </>
    )
}
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Toolbar from "./toolbar";
import { Toaster } from "@/components/ui/toaster"
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <SidebarProvider>
                {/* SIDEBAR */}
                <AppSidebar />
                {/* CONTENT */}
                <SidebarInset>
                    <Toolbar/>
                    <main>
                        {children}
                    
                        <Toaster />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    );
}

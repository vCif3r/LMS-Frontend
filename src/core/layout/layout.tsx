import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Toolbar from "../../components/toolbar";
import { Toaster } from "@/components/ui/toaster"
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <SidebarProvider>
                {/* SIDEBAR */}
                <AppSidebar />
                {/* CONTENT */}
                <SidebarInset>
                    <Toolbar/>
                    <main>
                        <Outlet />    
                        <Toaster />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    );
}

import { Header } from "./Layout/Header";
import { Sidebar } from "./Layout/Sidebar";
import { UserManagement } from "./UserManagement";

export default function Dashboard() {
    return (
        <div className="flex h-screen w-full bg-white dark:bg-matte-black transition-colors duration-200">
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white dark:bg-matte-black transition-colors duration-200">
                <Header />
                <UserManagement />
            </main>
        </div>
    );
}

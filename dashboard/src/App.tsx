import { Header } from "./components/Layout/Header";
import { Sidebar } from "./components/Layout/Sidebar";
import { UserManagement } from "./components/UserManagement";

function App() {
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

export default App;

import { useState, useEffect } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./lib/firebase";
import { Header } from "./components/Layout/Header";
import { Sidebar } from "./components/Layout/Sidebar";
import { UserManagement } from "./components/UserManagement";
import { Login } from "./components/Login";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-matte-black">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900 dark:border-zinc-800 dark:border-t-white"></div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

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

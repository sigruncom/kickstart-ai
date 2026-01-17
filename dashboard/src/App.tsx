import { useState, useEffect, Suspense, lazy } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./lib/firebase";

// Lazy load components
const Login = lazy(() => import("./components/Login").then(module => ({ default: module.Login })));
const Dashboard = lazy(() => import("./components/Dashboard"));

// Loading spinner component for reuse
const Loading = () => (
  <div className="flex h-screen w-full items-center justify-center bg-white dark:bg-matte-black">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900 dark:border-zinc-800 dark:border-t-white"></div>
  </div>
);

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
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      {!user ? <Login /> : <Dashboard />}
    </Suspense>
  );
}

export default App;

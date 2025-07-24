import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AppDetails from "./pages/AppDetails";
import DeveloperPanel from "./pages/DeveloperPanel";
import AdminPanel from "./pages/AdminPanel";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { APP_NAME } from "./constants";
import AppBarMain from "./components/AppBarMain";

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
      if (user) fetchRole(user.id);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) fetchRole(session.user.id);
      else setRole("user");
    });
    // eslint-disable-next-line
  }, []);

  async function fetchRole(uid) {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", uid)
      .single();
    setRole(data?.role || "user");
  }

  if (loading) return <div style={{margin:48}}>Loading...</div>;

  return (
    <>
      <AppBarMain user={user} role={role} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/app/:id" element={<AppDetails user={user} />} />
        <Route path="/developer" element={user ? <DeveloperPanel user={user} /> : <Navigate to="/" />} />
        <Route path="/admin" element={role === "admin" ? <AdminPanel user={user} /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
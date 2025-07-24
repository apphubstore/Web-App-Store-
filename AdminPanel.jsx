import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function AdminPanel({ user }) {
  const [apps, setApps] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchAllApps();
    // eslint-disable-next-line
  }, [refresh]);

  async function fetchAllApps() {
    const { data } = await supabase
      .from("apps")
      .select("*")
      .order("created_at", { ascending: false });
    setApps(data || []);
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this app?")) return;
    await supabase.from("apps").delete().eq("id", id);
    setRefresh(r => !r);
  }

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", mt: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Admin Panel
        </Typography>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f0f6ff" }}>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Developer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {apps.map(app => (
              <tr key={app.id} style={{ borderBottom: "1px solid #e0e7ef" }}>
                <td>{app.name}</td>
                <td>{app.description?.substring(0, 40)}</td>
                <td>{app.category}</td>
                <td>{app.developer_id}</td>
                <td>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(app.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Paper>
    </Box>
  );
}
import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import { CATEGORIES } from "../constants";

export default function DeveloperPanel({ user }) {
  const [apps, setApps] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState(CATEGORIES[0]);
  const [icon, setIcon] = useState(null);
  const [apk, setApk] = useState(null);
  const [message, setMessage] = useState("");
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchMyApps();
    // eslint-disable-next-line
  }, [user, reload]);

  async function fetchMyApps() {
    const { data } = await supabase
      .from("apps")
      .select("*")
      .eq("developer_id", user.id)
      .order("created_at", { ascending: false });
    setApps(data || []);
  }

  async function handleUpload(e) {
    e.preventDefault();
    setMessage("");
    if (!name || !desc || !cat || !icon || !apk) {
      setMessage("Fill all fields and select files.");
      return;
    }
    try {
      // Upload icon
      const { data: iconFile, error: iconError } = await supabase
        .storage
        .from("icons")
        .upload(`${user.id}-${Date.now()}-${icon.name}`, icon, { upsert: false });
      if (iconError) throw iconError;
      const { data: iconUrl } = supabase
        .storage
        .from("icons")
        .getPublicUrl(iconFile.path);

      // Upload APK
      const { data: apkFile, error: apkError } = await supabase
        .storage
        .from("apks")
        .upload(`${user.id}-${Date.now()}-${apk.name}`, apk, { upsert: false });
      if (apkError) throw apkError;
      const { data: apkUrl } = supabase
        .storage
        .from("apks")
        .getPublicUrl(apkFile.path);

      // Insert app
      const { error } = await supabase.from("apps").insert([
        {
          name,
          description: desc,
          icon_url: iconUrl.publicUrl,
          apk_url: apkUrl.publicUrl,
          category: cat,
          developer_id: user.id,
        }
      ]);
      if (error) throw error;
      setMessage("App uploaded successfully!");
      setName(""); setDesc(""); setCat(CATEGORIES[0]); setIcon(null); setApk(null);
      setReload(r => !r);
    } catch (e) {
      setMessage("Upload failed: " + e.message);
    }
  }

  return (
    <Box sx={{ maxWidth: 650, mx: "auto", mt: 4 }}>
      <Paper sx={{ p: 4, borderRadius: 4, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Developer Dashboard
        </Typography>
        <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TextField label="App/Game Name" value={name} onChange={e => setName(e.target.value)} required />
          <TextField label="Description" value={desc} onChange={e => setDesc(e.target.value)} multiline minRows={2} required />
          <TextField select label="Category" value={cat} onChange={e => setCat(e.target.value)} required>
            {CATEGORIES.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
          <Box>
            <label>App Icon (PNG/JPG): </label>
            <input type="file" accept="image/*" onChange={e => setIcon(e.target.files[0])} required />
          </Box>
          <Box>
            <label>APK File: </label>
            <input type="file" accept=".apk" onChange={e => setApk(e.target.files[0])} required />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            Upload App
          </Button>
        </form>
        {message && <Typography sx={{ mt: 2, color: message.includes("success") ? "green" : "red" }}>{message}</Typography>}
      </Paper>
      <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>Your Apps</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        {apps.map(app => (
          <Paper key={app.id} sx={{ p: 2, minWidth: 200, maxWidth: 230 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <img src={app.icon_url} alt={app.name} width={36} style={{ borderRadius: 6 }} />
              <Typography>{app.name}</Typography>
            </Box>
            <Typography variant="caption" color="text.secondary">{app.category}</Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>{app.description?.substring(0, 60)}</Typography>
            <a href={app.apk_url} target="_blank" rel="noopener noreferrer">
              <Button size="small" sx={{ mt: 1 }}>Download</Button>
            </a>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}
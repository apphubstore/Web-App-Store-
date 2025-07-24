import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import AuthGoogleButton from "../components/AuthGoogleButton";

export default function AppDetails({ user }) {
  const { id } = useParams();
  const [appData, setAppData] = useState(null);

  useEffect(() => {
    supabase
      .from("apps")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => setAppData(data));
  }, [id]);

  if (!appData) return <Box sx={{ m: 8 }}>Loading...</Box>;

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", mt: 5 }}>
      <Paper sx={{ p: 4, borderRadius: 5, boxShadow: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={appData.icon_url || "/icons/icon-192x192.png"} alt={appData.name} style={{ width: 120, borderRadius: 16 }} />
          <Typography variant="h5" sx={{ mt: 2, fontWeight: 700 }}>
            {appData.name}
          </Typography>
          <Typography variant="body1" sx={{ color: "#444", mt: 1, mb: 2 }}>
            {appData.description}
          </Typography>
          <Typography variant="caption" color="primary" sx={{ mb: 2 }}>
            Category: {appData.category}
          </Typography>
          {user ? (
            <a href={appData.apk_url} target="_blank" rel="noopener noreferrer">
              <Button variant="contained" color="primary" sx={{ mt: 3 }}>
                Download / Install
              </Button>
            </a>
          ) : (
            <Box sx={{ mt: 2 }}>
              <AuthGoogleButton />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                Sign in to download this app/game.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
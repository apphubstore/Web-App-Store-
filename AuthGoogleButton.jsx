import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { supabase } from "../supabaseClient";

export default function AuthGoogleButton({ onSuccess }) {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) alert("Google login failed: " + error.message);
    // Success handled by onAuthStateChange in App.jsx
  };
  return (
    <Button
      fullWidth
      variant="contained"
      startIcon={<GoogleIcon />}
      onClick={handleLogin}
      sx={{
        mt: 2,
        background: "linear-gradient(90deg,#5f2,#2af)",
        color: "#222",
        fontWeight: 600,
        textTransform: "none"
      }}
    >
      Sign in with Google
    </Button>
  );
}
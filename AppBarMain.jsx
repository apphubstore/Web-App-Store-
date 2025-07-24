import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Button from "@mui/material/Button";
import { APP_NAME } from "../constants";

export default function AppBarMain({ user, role }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <AppBar position="sticky" sx={{ background: "linear-gradient(90deg,#4f8cff 0%,#00d4ff 100%)" }} elevation={3}>
      <Toolbar>
        <StoreIcon sx={{ mr: 1, color: "#fff" }} />
        <Typography component={Link} to="/" variant="h6" sx={{ flexGrow: 1, color: "#fff", textDecoration: "none" }}>
          {APP_NAME}
        </Typography>
        <Button component={Link} to="/" sx={{ color: "#fff", mr: 1 }}>
          Home
        </Button>
        <Button component={Link} to="/developer" sx={{ color: "#fff", mr: 1 }}>
          Developer
        </Button>
        {role === "admin" && (
          <Button component={Link} to="/admin" sx={{ color: "#fff", mr: 1 }}>
            Admin
          </Button>
        )}
        {user ? (
          <>
            <IconButton sx={{ color: "#fff" }} disabled>
              <PersonIcon />
            </IconButton>
            <IconButton onClick={handleLogout} sx={{ color: "#fff" }}>
              <LogoutIcon />
            </IconButton>
          </>
        ) : (
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            startIcon={<LoginIcon />}
            component={Link}
            to="/"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
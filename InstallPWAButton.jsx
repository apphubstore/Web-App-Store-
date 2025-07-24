import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";

function InstallPWAButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setVisible(true);
    });
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") setVisible(false);
    }
  };

  if (!visible) return null;
  return (
    <Button
      onClick={handleInstall}
      startIcon={<DownloadIcon />}
      sx={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 999,
        padding: "12px 24px",
        fontWeight: "bold",
        borderRadius: 3,
        background: "linear-gradient(90deg,#4f8cff,#00d4ff)",
        color: "#fff",
        boxShadow: "0 6px 18px #4f8cff44"
      }}
      variant="contained"
    >
      Install WebAppStore
    </Button>
  );
}

export default InstallPWAButton;
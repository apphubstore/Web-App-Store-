import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function AppCard({ app }) {
  return (
    <motion.div whileHover={{ scale: 1.04, rotateY: 4 }}>
      <Card
        sx={{
          maxWidth: 240,
          minHeight: 340,
          m: 1,
          borderRadius: 4,
          background: "linear-gradient(135deg,#e9f2ff 0%,#f3f9ff 100%)",
          boxShadow: "0 4px 24px #4f8cff33",
        }}
        component={Link}
        to={`/app/${app.id}`}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={app.icon_url || "/icons/icon-192x192.png"}
            alt={app.name}
            sx={{ width: 100, height: 100, margin: "24px auto 0 auto", borderRadius: 3, boxShadow: "0 2px 12px #0001" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: "center" }}>
              {app.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ minHeight: 48, textAlign: "center" }}>
              {app.description?.substring(0, 60)}
            </Typography>
            <Typography variant="caption" color="primary" sx={{ display: "block", textAlign: "center", mt: 1 }}>
              {app.category}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}
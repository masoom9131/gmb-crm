import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import gbpRoutes from "./routes/gbp.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Health check routes for Render cold-start prevention & UptimeRobot
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "GMB CRM Backend is healthy and running",
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: Math.floor(process.uptime())
  });
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gbp", gbpRoutes);

export default app;

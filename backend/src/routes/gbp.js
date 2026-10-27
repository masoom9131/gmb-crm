import express from "express";
import getGbpClient from "../services/gbp/index.js";
const router = express.Router();

router.get("/locations", async (req, res) => {
  const client = getGbpClient();
  const data = await client.listLocations();
  res.json(data);
});

export default router;
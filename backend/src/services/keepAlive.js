import https from "https";
import http from "http";

/**
 * Self-ping keep-alive service.
 * Helps prevent Render free tier instance from sleeping during active cycles.
 * Interval defaults to 10 minutes (Render spins down after 15 mins).
 */
export const startKeepAlive = () => {
  const targetUrl = process.env.RENDER_EXTERNAL_URL || process.env.SERVER_URL || "https://gmb-crm.onrender.com";

  // Only run in production or when explicitly configured
  if (process.env.NODE_ENV !== "production" && !process.env.ENABLE_KEEP_ALIVE) {
    return;
  }

  const pingIntervalMinutes = 10;
  const intervalMs = pingIntervalMinutes * 60 * 1000;

  console.log(`[KeepAlive] Scheduled keep-alive ping for ${targetUrl}/api/health every ${pingIntervalMinutes} minutes.`);

  setInterval(() => {
    try {
      const pingUrl = new URL("/api/health", targetUrl).toString();
      const client = pingUrl.startsWith("https") ? https : http;

      client.get(pingUrl, (res) => {
        console.log(`[KeepAlive] Ping to ${pingUrl} responded with status: ${res.statusCode}`);
      }).on("error", (err) => {
        console.warn(`[KeepAlive] Ping failed: ${err.message}`);
      });
    } catch (err) {
      console.warn(`[KeepAlive] Error executing ping: ${err.message}`);
    }
  }, intervalMs);
};

export default startKeepAlive;

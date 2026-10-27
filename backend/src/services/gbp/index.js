import MockGbpClient from "./MockGbpClient.js";
import RealGbpClient from "./RealGbpClient.js";

export default function getGbpClient() {
  const provider = process.env.GBP_PROVIDER || "mock";
  if (provider === "real") return new RealGbpClient();
  return new MockGbpClient();
}

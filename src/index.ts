import "dotenv/config";
import { hono } from "./routes";
import { serve } from "@hono/node-server";

serve(hono, (info) => {
  console.log(`Server is running on port ${info.port}`);
});
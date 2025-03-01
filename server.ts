import app from "./src/app";
import { createServer } from "http";
import * as dotenv from "dotenv";

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.development" });
}

const PORT = process.env.PORT || 3055;

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`WSV eCommerce start with port: ${PORT}`);
});

process.on("SIGINT", () => {
  server.close(() => console.log(`Exit Server Express`));
});

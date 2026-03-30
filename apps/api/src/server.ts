import { createApp } from "./app.js";

const DEFAULT_PORT = 3001;
const port = Number.parseInt(process.env.PORT ?? `${DEFAULT_PORT}`, 10);
const app = createApp();

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});


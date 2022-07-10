import app from "./app"
import Infrastructure from "../infrastructure";

const PORT = Number(process.env.API_PORT || "8000")

app.listen(PORT, async () => {
  await Infrastructure.init();
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
})

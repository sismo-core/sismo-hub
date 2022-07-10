import express from "express";
import groups from "../topics/group/group.api";

const app = express();

app.use("/groups", groups);

export default app;

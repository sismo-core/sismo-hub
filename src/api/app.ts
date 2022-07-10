import express from "express";
import groups from "../group/group.api";

const app = express();

app.use("/groups", groups);

export default app;

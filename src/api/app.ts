import express from "express";
import groups from "../topics/group/group.api";
import groupGenerators from "../topics/group-generator/group-generator.api";

const app = express();

app.use("/groups", groups);
app.use("/group-generators", groupGenerators);

export default app;

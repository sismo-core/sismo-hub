import express from "express";
import attesters from "../topics/attester/attester.api";
import badges from "../topics/badge/badge.api";
import groupGenerators from "../topics/group-generator/group-generator.api";
import groups from "../topics/group/group.api";

const app = express();

app.use("/groups", groups);
app.use("/group-generators", groupGenerators);
app.use("/attesters", attesters);
app.use("/badges", badges);

export default app;

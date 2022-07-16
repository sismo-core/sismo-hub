import express from "express";
import attesters from "../topics/attester/attester.api";
import badges from "../topics/badge/badge.api";
import groups from "../topics/group/group.api";

const app = express();

app.use("/groups", groups);

app.use("/badges", badges);

app.use("/attesters", attesters);

export default app;

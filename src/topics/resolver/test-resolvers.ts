import { GlobalResolver } from "topics/resolver/global-resolver";

export const testGlobalResolver = new GlobalResolver([
  "^test:",
  "^0x[a-fA-F0-9]{40}$",
]);

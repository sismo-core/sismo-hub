import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";

const createSession = async () => {
  const apiHash = process.env.TELEGRAM_API_HASH;
  const apiId = process.env.TELEGRAM_API_ID;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!apiHash || !apiId || !botToken) {
    throw new Error("Missing required: TELEGRAM_API_HASH, TELEGRAM_API_ID, TELEGRAM_BOT_TOKEN");
  }

  const client = new TelegramClient(new StringSession(""), +apiId, apiHash, {});
  await client.start({ botAuthToken: botToken });
  const session = client.session.save();
  await client.disconnect();
  
  return session;
};

const main = async () => {
  console.log(await createSession());
  process.exit(0);
};

main();
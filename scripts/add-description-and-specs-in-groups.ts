import axios from "axios";
import { Command } from "commander";

const main = async () => {
  const program = new Command();
  program.option("-u, --url <url>", "url of the api", "http://localhost:8000");

  const options = program.parse(process.argv).opts();
  const { url } = options;

  console.log(`Fetching badges from ${url}`);

  const response = await axios({
    url: `${url}/badges/`,
    method: "get",
  });

  console.log(response.data);
};

main();

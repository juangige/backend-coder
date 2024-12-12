import { Command } from "commander";
const args = new Command();

args.option("-p <port>", "puerto", 1000);
args.option("--mode <mode>", "modo", "dev");

args.parse();

export default args.opts();

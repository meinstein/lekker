// import { join } from "path";
// import { promises } from "fs";
// import { cwd, chdir } from "process";

// import { UserConfig } from "../../src/config";

// const TEMP_DIR = "tmp";

// const removeTmpDir = async () => {
//   await promises.rmdir(TEMP_DIR, { recursive: true });
// };

// export const createConfig = async (config: UserConfig) => {
//   await removeTmpDir();
//   // Create tmp dir
//   await promises.mkdir(TEMP_DIR, { recursive: true });
//   // Copy file tree to tmp dir
//   // CD indo it
//   chdir(TEMP_DIR);
//   // Build path to config file
//   const configPath = join(cwd(), CONFIG_FILE_NAME);
//   // create a config
//   await promises.writeFile(configPath, JSON.stringify(config));
// };

// export const removeConfig = async () => {
//   chdir("../");
//   await removeTmpDir();
// };

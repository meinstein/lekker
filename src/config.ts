import yargs, { Argv } from "yargs";
import path from "path";

import fs from "./file";
import { isRootDocument } from "./map";

export interface UserConfig {
  rootDoc: string;
  outDir: string;
}

export interface Config {
  rootDoc: string;
  rootDir: string;
  outDir: string;
}

export const parseConfig = (argv: string[]): Config => {
  const { argv: config } = yargs(argv)
    .command("build <rootDoc>", "The root document for your project.", (yargs: Argv) => {
      return yargs.options({
        rootDoc: {
          type: "string",
          demandOption: true
        }
      });
    })
    .demandCommand(1, "Must provide at least one command.")
    .options({
      outDir: {
        type: "string",
        default: "dist"
      }
    });

  const rootDoc = path.join(fs.cwd(), path.normalize(config.rootDoc));

  if (!rootDoc) {
    console.error(`Root document not specified.`);
    process.exit(1);
  }

  // Ensure that rootDoc is, in fact, a index.html file.
  if (!isRootDocument(rootDoc)) {
    console.error(`Not a valid root document: ${rootDoc}`);
    process.exit(1);
  }

  if (!fs.isFile(rootDoc)) {
    console.error(`Could not locate root document: ${rootDoc}`);
    process.exit(1);
  }

  console.log(`Targeting following root document ${rootDoc}`);

  const outDir = path.normalize(config.outDir);

  // @TODO Don't let src dir be out dir!

  if (outDir) {
    console.log(`Sending compiled documents ${outDir}`);
  }

  return {
    rootDoc,
    outDir,
    rootDir: path.dirname(rootDoc)
  };
};

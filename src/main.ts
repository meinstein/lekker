import process from "process";
import path from "path";
import fs from "fs";
import { JSDOM } from "jsdom";

import { parseConfig } from "./config";
import file from "./file";
import { getRootDocumentsForFile, getOutPathForDocuments, isRootDocument } from "./map";
import { domReducer } from "./reduce";

const createDocument = (outDir: string) => async (documents: string[]) => {
  const outPath = getOutPathForDocuments(documents, outDir);
  const files = documents.map((document) => fs.promises.readFile(document, "utf8"));
  const [rootDocument, ...rest] = await Promise.all(files);
  const dom = new JSDOM(rootDocument);
  const fragments = rest.map(JSDOM.fragment);
  const combinedDom = fragments.reduce(domReducer, dom);
  await fs.promises.mkdir(path.dirname(outPath), { recursive: true });
  await fs.promises.writeFile(outPath, combinedDom.serialize());
};

export const main = async () => {
  // argv sans bin
  const argv = process.argv.slice(2);
  const config = parseConfig(argv);

  const files = file.getFilesRecursively(config.rootDir);
  const rootDocuments = files.filter(isRootDocument);
  const documentLists = files.map(getRootDocumentsForFile(rootDocuments));
  await Promise.all(documentLists.map(createDocument(config.outDir)));
};

main();

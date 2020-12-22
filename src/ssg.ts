#!/usr/bin/env node

import process from "process";

import { parseConfig } from "./config";
import { composeDocument } from "./reduce";
import { getDocumentComposeMap, getOutPathForComposedDocument, isRootDocument, isDocument } from "./map";
import { fs } from "./utils";

const composeAndWriteDocument = (outDir: string) => async (documents: string[]) => {
  const outPath = getOutPathForComposedDocument(documents, outDir);
  const composedDocument = await composeDocument(documents);
  const document = composedDocument.serialize();
  await fs.writeFile(outPath, document);
};

/**
 * Calling ssg() will compose all files in the provided tree and write them
 * to the configured out dir.
 */
export const ssg = async () => {
  // argv sans bin
  const argv = process.argv.slice(2);
  const config = parseConfig(argv);
  const files = fs.getFilesRecursively(config.rootDir);
  // Add log that non-document files were detected
  // Filter out any non-documents && print log about any non-document detected
  const documents = files.filter(isDocument);
  const rootDocuments = documents.filter(isRootDocument);
  const documentComposeMap = documents.map(getDocumentComposeMap(rootDocuments));
  await Promise.all(documentComposeMap.map(composeAndWriteDocument(config.outDir)));
};

ssg();

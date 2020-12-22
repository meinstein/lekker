import fs from "fs";

import { path as _path } from ".";

const isDirectory = (path: string) => {
  return fs.statSync(path).isDirectory();
};

const getDirectories = (path: string) => {
  return fs
    .readdirSync(path)
    .map((name) => _path.join(path, name))
    .filter(isDirectory);
};

const isFile = (path: string) => {
  return fs.statSync(path).isFile();
};

const getFiles = (path: string) => {
  return fs
    .readdirSync(path)
    .map((name) => _path.join(path, name))
    .filter(isFile);
};

const getFilesRecursively = (dir: string): string[] => {
  const dirs = getDirectories(dir);
  const files = dirs
    // go through each directory
    .map(getFilesRecursively)
    // map returns a 2d array (array of file arrays) so flatten
    .reduce((a, b) => a.concat(b), []);

  return files.concat(getFiles(dir));
};

const writeFile = async (outPath: string, document: string) => {
  await fs.promises.mkdir(_path.dirname(outPath), { recursive: true });
  await fs.promises.writeFile(outPath, document);
};

const readFile = async (file: string) => {
  return fs.promises.readFile(file, "utf8");
};

export default {
  isDirectory,
  getDirectories,
  isFile,
  getFiles,
  getFilesRecursively,
  readFile,
  writeFile
};

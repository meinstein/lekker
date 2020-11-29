import { join } from "path";
import process from "process";
import { statSync, readdirSync } from "fs";

const isDirectory = (path: string) => {
  return statSync(path).isDirectory();
};

const getDirectories = (path: string) => {
  return readdirSync(path)
    .map((name) => join(path, name))
    .filter(isDirectory);
};

const isFile = (path: string) => {
  return statSync(path).isFile();
};

const getFiles = (path: string) => {
  return readdirSync(path)
    .map((name) => join(path, name))
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

const cwd = () => {
  return process.cwd();
};

export default { isDirectory, getDirectories, isFile, getFiles, getFilesRecursively, cwd };

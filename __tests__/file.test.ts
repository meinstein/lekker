import { fs, path } from "../src/utils";

test("Recursively fetches all files", () => {
  const pathToRootDir = path.join(__dirname, "tree");
  const files = fs.getFilesRecursively(pathToRootDir);
  expect(files).toHaveLength(6);
});

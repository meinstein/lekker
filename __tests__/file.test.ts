import fs from "../src/file";
import path from "path";

test("Recursively fetches all files", () => {
  const pathToRootDir = path.join(__dirname, "tree");
  const files = fs.getFilesRecursively(pathToRootDir);
  expect(files).toHaveLength(5);
});

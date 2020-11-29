import { getRootDocumentsForFile, isRootDocument, getOutPathForDocuments } from "../src/map";

export const mockFiles = [
  "__tests__/tree/pictures/amsterdam.html",
  "__tests__/tree/pictures/index.html",
  "__tests__/tree/recipes/index.html",
  "__tests__/tree/recipes/pasta.html",
  "__tests__/tree/index.html"
];

export const mockRootDocuments = [
  "__tests__/tree/pictures/index.html",
  "__tests__/tree/recipes/index.html",
  "__tests__/tree/index.html"
];

export const mockDocuments = [
  ["__tests__/tree/index.html", "__tests__/tree/pictures/index.html", "__tests__/tree/pictures/amsterdam.html"],
  ["__tests__/tree/index.html", "__tests__/tree/pictures/index.html"],
  ["__tests__/tree/index.html", "__tests__/tree/recipes/index.html"],
  ["__tests__/tree/index.html", "__tests__/tree/recipes/index.html", "__tests__/tree/recipes/pasta.html"],
  ["__tests__/tree/index.html"]
];

test("isRootDocument", () => {
  const rootDocuments = mockFiles.filter(isRootDocument);
  expect(rootDocuments).toEqual(mockRootDocuments);
});

test("getRootDocumentsForFile", () => {
  const documents = mockFiles.map(getRootDocumentsForFile(mockRootDocuments));
  expect(documents).toEqual(mockDocuments);
});

test("getOutPathForDocuments", () => {
  const outDir = "public";
  const documents = ["__tests__/tree/index.html", "__tests__/tree/recipes/index.html"];
  const outPath = getOutPathForDocuments(documents, outDir);
  expect(outPath).toBe("public/recipes/index.html");
});

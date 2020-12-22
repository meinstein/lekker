import { getDocumentComposeMap, isRootDocument, getOutPathForComposedDocument, isDocument } from "../src/map";

export const mockFiles = [
  "__tests__/tree/pictures/amsterdam.html",
  "__tests__/tree/pictures/index.html",
  "__tests__/tree/recipes/index.html",
  "__tests__/tree/recipes/pasta.html",
  "__tests__/tree/index.html",
  "__tests__/tree/styles.css"
];

// All files after non-HTML documents have been filtered out.
export const mockDocuments = [
  "__tests__/tree/pictures/amsterdam.html",
  "__tests__/tree/pictures/index.html",
  "__tests__/tree/recipes/index.html",
  "__tests__/tree/recipes/pasta.html",
  "__tests__/tree/index.html"
];

// All files after non-HTML documents AND non index.html files have been filtered out.
export const mockRootDocuments = [
  "__tests__/tree/pictures/index.html",
  "__tests__/tree/recipes/index.html",
  "__tests__/tree/index.html"
];

// A 2D array that expresses the various fragments that must be composed to create the final document.
export const mockComposeMap = [
  ["__tests__/tree/index.html", "__tests__/tree/pictures/index.html", "__tests__/tree/pictures/amsterdam.html"],
  ["__tests__/tree/index.html", "__tests__/tree/pictures/index.html"],
  ["__tests__/tree/index.html", "__tests__/tree/recipes/index.html"],
  ["__tests__/tree/index.html", "__tests__/tree/recipes/index.html", "__tests__/tree/recipes/pasta.html"],
  ["__tests__/tree/index.html"]
];

test("isDocument", () => {
  const documents = mockFiles.filter(isDocument);
  expect(documents).toEqual(mockDocuments);
});

test("isRootDocument", () => {
  const rootDocuments = mockFiles.filter(isRootDocument);
  expect(rootDocuments).toEqual(mockRootDocuments);
});

test("getDocumentComposeMap", () => {
  const documents = mockDocuments.map(getDocumentComposeMap(mockRootDocuments));
  expect(documents).toEqual(mockComposeMap);
});

test("getOutPathForComposedDocument", () => {
  const outDir = "public";
  const documents = ["__tests__/tree/index.html", "__tests__/tree/recipes/index.html"];
  const outPath = getOutPathForComposedDocument(documents, outDir);
  expect(outPath).toBe("public/recipes/index.html");
});

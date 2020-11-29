import path from "path";

export interface Doc {
  /**
   * The final destination of the composed document.
   */
  out: string;
  /**
   * The source location of the document.
   */
  src: string;
  /**
   * An ordered list of the documents that will be composed to
   * create the final product.
   * Starting from the outer-most document and going to the actual src.
   */
  docs: string[];
}

export const isRootDocument = (document: string) => {
  return path.basename(document) === "index.html";
};

export const getRootDocumentsForFile = (rootDocuments: string[]) => (document: string): string[] => {
  const subDocumentsForFile = rootDocuments
    /**
     * Gather all roots to this path.
     */
    .filter((rootDocument) => {
      return document.startsWith(path.dirname(rootDocument));
    })
    /**
     * Sort to ensure that the "smallest" file path is first in the list.
     * The "smallest" file path is necessarily the outer-most document that
     * the reducer should eventually start on.
     */
    .sort((documentA, documentB) => documentA.length - documentB.length);

  // Note: Index docs are already in the list of root dirs
  if (!isRootDocument(document)) {
    subDocumentsForFile.push(document);
  }

  return subDocumentsForFile;
};

export const getOutPathForDocuments = (documents: string[], outDir: string) => {
  const rootPath = documents[0];
  const endPath = documents[documents.length - 1];
  // Location of the composed file.
  // Note: replace root dir with the our dir before combininig with parsed file base.
  // Example: "/src/foo/bar/baz.html" => /out/foo/bar/baz.html
  return endPath.replace(path.dirname(rootPath), outDir);
};

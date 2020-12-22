import { composeDocument } from "./reduce";

export const isRootPath = (path: string): boolean => {
  return ["/", "/index", "/index.html"].includes(path);
};

const INDEX_DOC = "/index.html";

export const getDocumentsForPath = (path: string): string[] => {
  const documents: string[] = [];

  // In this case, bail early as there's only one document needed.
  if (isRootPath(path)) {
    documents.push(INDEX_DOC);
    return documents;
  }

  const parts = path
    .split("/")
    .filter(Boolean)
    .map((p) => `/${p}`);

  const isLeafNode = parts[parts.length - 1];
  const isLeafNodeARootPath = isRootPath(isLeafNode);

  for (let i = 0; i < parts.length; i++) {
    const isLastNode = i === parts.length - 1;
    const subPart = parts.slice(0, i);

    if (isLastNode && isLeafNodeARootPath) {
      documents.push(path);
    } else {
      documents.push(subPart.concat(INDEX_DOC).join(""));
      if (isLastNode) documents.push(path);
    }
  }

  return documents;
};

/**
 * Parses the path to the resource targeted by the end-user and returns a composed document.
 * For example: "/"" or "/foo" or "/foo/bar"
 */
export const ssr = async (path: string): Promise<string> => {
  const documents = getDocumentsForPath(path);
  const composedDocument = await composeDocument(documents);
  return composedDocument.serialize();
  // First step: normalize the user-requested path (append ext, etc)
  // First step: get all files in the tree
  // Second step: validate that the user-requested path is among the available tree files
  // Third step: Gather all documents needed to compose the document at the user-requested path
};

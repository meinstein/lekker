import { JSDOM } from "jsdom";

import { DocumentTree, FragmentTree } from "./tags";

export const domReducer = (dom: JSDOM, fragment: DocumentFragment): JSDOM => {
  const doc = new DocumentTree(dom);
  const frag = new FragmentTree(fragment);

  frag.head.forEach((el) => doc.sanitize(el));
  frag.body.forEach((el) => doc.sanitize(el));

  frag.normalizedHead.forEach((el) => doc.upsert(el));
  frag.normalizedBody.forEach((el) => doc.upsert(el));

  return doc.dom;
};

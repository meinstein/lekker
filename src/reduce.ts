import { JSDOM } from "jsdom";

export const domReducer = (dom: JSDOM, fragment: DocumentFragment): JSDOM => {
  const rootHead = dom.window.document.querySelector("head");
  /**
   * META
   */
  const fragmentMetas = fragment.querySelectorAll("meta");

  fragmentMetas.forEach((el) => {
    rootHead?.appendChild(el);
  });

  /**
   * MAIN
   */
  const fragmentMains = fragment.querySelectorAll("main");

  if (fragmentMains.length > 1) {
    // ADD LOG HERE
    throw new Error("A document can only contain one 'main' element.");
  }

  if (fragmentMains.length > 0) {
    const [main] = fragmentMains;
    const rootBody = dom.window.document.querySelector("body");
    rootBody?.childNodes.forEach((child) => child.remove());
    rootBody?.appendChild(main);
  }

  return dom;
};

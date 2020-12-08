import { JSDOM } from "jsdom";

import { LekkerCompose, Container } from "./compose";

export class DocumentTree extends LekkerCompose {
  _dom: JSDOM;

  constructor(dom: JSDOM) {
    super();
    this._dom = dom;
  }

  get head() {
    return this._dom.window.document?.querySelector("head");
  }

  get body() {
    return this._dom.window.document?.querySelector("body");
  }

  get dom() {
    return this._dom;
  }

  parseElement(element: Element) {
    const name = element.tagName.toLowerCase();
    const spec = this._tagMap[name];

    return {
      name,
      spec
    };
  }

  upsert(element: Element): void {
    const { spec } = this.parseElement(element);

    if (spec.container === "head") {
      this.head?.appendChild(element);
    }

    if (spec.container === "body") {
      this.body?.appendChild(element);
    }
  }

  /**
   * Removes all uniqueBy elements.
   * Accepts a list of elements and checks the compose rules for unique
   * constraints and removes existing matches accoridngly.
   */
  sanitize(element: Element) {
    const { name, spec } = this.parseElement(element);

    const removeExistingElementByTagName = spec?.uniqueBy?.tagName;

    if (removeExistingElementByTagName) {
      this._dom.window.document.querySelectorAll(name)?.forEach((el) => {
        el.remove();
      });
      return;
    }

    const attribute = spec?.uniqueBy?.attribute;

    if (attribute) {
      const value = element.getAttribute(attribute);
      if (value) {
        this._dom.window.document.querySelectorAll(`${name}[${attribute}=${value}]`)?.forEach((el) => {
          el.remove();
        });
      }
      return;
    }
  }
}

/**
 * This class gets instantiated with a fragment and groups
 * elements into containers.
 */
export class FragmentTree extends LekkerCompose {
  _elements: Element[];

  constructor(fragment: DocumentFragment) {
    super();
    this._elements = Array.from(fragment.querySelectorAll("*"));
  }

  get head() {
    return this._getElementsForContainer("head");
  }

  get body() {
    return this._getElementsForContainer("body");
  }

  get normalizedHead() {
    return this._getNormalizeElementsForContainer("head");
  }

  get normalizedBody() {
    return this._getNormalizeElementsForContainer("body");
  }

  _getElementsForContainer(container: Container) {
    return this._elements.filter((tag) => {
      // add nullish operator just in case tag is not in the tagMap
      // will effectively filter out all unsupported tags
      // NOTE: add log when this happens for sake of visiblity
      return this._tagMap[tag.tagName.toLowerCase()]?.container === container;
    });
  }

  /**
   * Normalizes elements.
   * Accepts a denormalized list of elements (result of querySelectAll("*")) and normalizes
   * them back into top-level elements.
   */
  _getNormalizeElementsForContainer(container: Container) {
    const uniqueElements = this[container].filter((element) => {
      return this._tagMap[element.tagName.toLowerCase()]?.uniqueBy?.tagName;
    });

    return this[container].filter((element) => {
      const elementIsContainedByUniqueElement = uniqueElements.some((uniqueElement) => {
        return !element.isSameNode(uniqueElement) && uniqueElement.contains(element);
      });

      return !elementIsContainedByUniqueElement;
    });
  }
}

import { JSDOM } from "jsdom";

import { oneLine } from "./helpers/html";
import { domReducer } from "../src/reduce";

const rootDocument = oneLine`
  <head>
    <title>Website</title>
  </head>
  <main>
    <p>Hello</p>
  </main>
`;

const fragmentOne = oneLine`
  <meta name="author" content="foo">
  <main>
    <p>World</p>
  </main>
`;

const fragmentTwo = oneLine`
  <meta name="author" content="bar">
  <main>
    <p>Hello World</p>
  </main>
`;

test("domReducer", () => {
  const dom = new JSDOM(rootDocument);
  const fragments = [fragmentOne, fragmentTwo].map(JSDOM.fragment);
  const combinedDom = fragments.reduce(domReducer, dom);
  const serializedDom = combinedDom.serialize();
  expect(serializedDom).toEqual(oneLine`
    <html>
      <head>
        <title>Website</title>
        <meta name="author" content="bar">
      </head>
      <body>
        <main>
          <p>Hello World</p>
        </main>
      </body>
    </html>
  `);
});

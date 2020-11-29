import { JSDOM } from "jsdom";

import { oneLine } from "./helpers/html";
import { domReducer } from "../src/reduce";

const rootDocument = oneLine`
  <html>
    <head>
    </head>
    <body>
      <main>
        <p>Hello</p>
      </main>
    </body>
  </html>
`;

const fragmentOne = oneLine`
  <meta author="foo">
  <main>
    <p>Goodbye</p>
  </main>
`;

test("domReducer", () => {
  const dom = new JSDOM(rootDocument);
  const fragments = [fragmentOne].map(JSDOM.fragment);
  const combinedDom = fragments.reduce(domReducer, dom);
  const serializedDom = combinedDom.serialize();
  expect(serializedDom).toEqual(oneLine`
    <html>
      <head>
        <meta author="foo">
      </head>
      <body>
        <main>
          <p>Goodbye</p>
        </main>
      </body>
    </html>
    `);
});

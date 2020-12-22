import { getDocumentsForPath, isRootPath } from "../src/ssr";

test("isRootPath", () => {
  expect(isRootPath("/")).toBeTruthy();
  expect(isRootPath("/index")).toBeTruthy();
  expect(isRootPath("/index.html")).toBeTruthy();
  expect(isRootPath("/foo/index.html")).toBeFalsy();
});

// sort of redundant bc it is just testing `isRootPath`
test("getDocumentsForPath - is root path", () => {
  expect(getDocumentsForPath("/")).toEqual(["/index.html"]);
  expect(getDocumentsForPath("/index")).toEqual(["/index.html"]);
  expect(getDocumentsForPath("/index.html")).toEqual(["/index.html"]);
});

test("getDocumentsForPath - ends with root", () => {
  const path = "/foo/bar/index.html";
  const documents = getDocumentsForPath(path);
  expect(documents).toEqual(["/index.html", "/foo/index.html", "/foo/bar/index.html"]);
});

test("getDocumentsForPath - ends with non-root", () => {
  const path = "/foo/bar/baz.html";
  const documents = getDocumentsForPath(path);
  expect(documents).toEqual(["/index.html", "/foo/index.html", "/foo/bar/index.html", "/foo/bar/baz.html"]);
});

import { path, fs, process } from "../src/utils";
import { parseConfig } from "../src/config";

const mockProcessArgv = [
  "/Users/user/.nvm/versions/node/v12.17.0/bin/node",
  "/Users/user/foo/lekker/lib/main",
  "build",
  "src/index.html"
];

const mockProcessArgvWithOptions = [...mockProcessArgv, "--outDir", "public"];

const mockedCwd = "/Users/user/foo/lekker";

beforeAll(() => {
  // Mock "process.cwd" before all tests run
  process.cwd = jest.fn().mockReturnValue(mockedCwd);
});

test("rootDoc", () => {
  // Mock "isFile" method that checks for root doc
  fs.isFile = jest.fn().mockReturnValueOnce(true);
  const config = parseConfig(mockProcessArgv.slice(2));
  expect(config.rootDoc).toBe(path.join(mockedCwd, "src/index.html"));
});

test("rootDir", () => {
  // Mock "isFile" method that checks for root doc
  fs.isFile = jest.fn().mockReturnValueOnce(true);
  const config = parseConfig(mockProcessArgv.slice(2));
  expect(config.rootDir).toBe(path.join(mockedCwd, "src"));
});

test("outDir - default", () => {
  // Mock "isFile" method that checks for root doc
  fs.isFile = jest.fn().mockReturnValueOnce(true);
  const config = parseConfig(mockProcessArgv.slice(2));
  expect(config.outDir).toBe("dist");
});

test("outDir - user provided", () => {
  // Mock "isFile" method that checks for root doc
  fs.isFile = jest.fn().mockReturnValueOnce(true);
  const config = parseConfig(mockProcessArgvWithOptions.slice(2));
  expect(config.outDir).toBe("public");
});

import process from "process";

const cwd = () => {
  return process.cwd();
};

const exit = (code: number | undefined) => {
  return process.exit(code);
};

export default {
  cwd,
  exit
};

export const oneLine = (strings: TemplateStringsArray) => {
  return strings[0]
    .split("\n")
    .map((s) => s.trim())
    .join("");
};

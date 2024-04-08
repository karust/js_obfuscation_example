const fs = require("fs");
const babel = require("@babel/core");

let code = fs.readFileSync("./output.js", "utf-8");

const plugins = ["./plugins/deobfPropsStrings.js"];

let transformedCode = code;

plugins.forEach((p, i) => {
  console.log(`[${i + 1}] Running: ${p}`);
  transformedCode = babel.transform(transformedCode, {
    plugins: [p],
  }).code;
});

fs.writeFileSync("./input.js", transformedCode);

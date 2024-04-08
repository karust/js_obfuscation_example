const fs = require("fs");
const babel = require("@babel/core");

let code = fs.readFileSync("./input.js", "utf-8");

const plugins = ["./plugins/hidePropsStrings.js", "./plugins/hideName.js"];

let transformedCode = code;

plugins.forEach((p, i) => {
  console.log(`[${i + 1}] Running: ${p}`);
  transformedCode = babel.transform(transformedCode, {
    plugins: [p],
  }).code;
});

fs.writeFileSync("./output.js", transformedCode);

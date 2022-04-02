// node script to minify SVG assets

const { readFile, writeFile } = require("fs");
const { optimize } = require("svgo");

// dict-like object with input files as keys and output files as values
const svgMap = {
  "./assets/favicon.svg": "./public/favicon.svg",
  "./assets/knob.svg": "./src/components/knob/knob.svg",
};

for (let f in svgMap) {
  readFile(f, "utf-8", (err, data) => {
    if (err) throw err;
    const result = optimize(data, {
      path: f,
      multipass: true,
    });
    writeFile(svgMap[f], result.data, "utf-8", (err) => {
      if (err) throw err;
      console.log(`Minified '${f}' and wrote to '${svgMap[f]}'!`);
    });
  });
}

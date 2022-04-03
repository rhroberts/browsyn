// node script to minify SVG assets

const { readFile, writeFile } = require("fs");
const { optimize } = require("svgo");

// dict-like object with input files as keys and output files as values
// { "source": "dest"}
const svgMap = {
  "./assets/favicon.svg": "./public/favicon.svg",
  "./assets/knob.svg": "./src/components/knob/knob.svg",
  "./assets/blackkey.svg": "./src/components/keyboard/blackkey.svg",
  "./assets/whitekey.svg": "./src/components/keyboard/whitekey.svg",
  "./assets/whitekey_blackleft.svg":
    "./src/components/keyboard/whitekey_blackleft.svg",
  "./assets/whitekey_blackright.svg":
    "./src/components/keyboard/whitekey_blackright.svg",
  "./assets/whitekey_blackleftright.svg":
    "./src/components/keyboard/whitekey_blackleftright.svg",
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

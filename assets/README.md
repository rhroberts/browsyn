# Project Assets

The files in this folder are not used directly in the web application. They
include, for example, the Inkscape SVG files that contain extra metadata. These
require an extra processing step before being included in their respective
locations in `./src/`.

Examine `./scripts/minSvg.js` to see how they are processed.

These files can be processed in bulk by calling `npm run minSvg`.

_This README will need to be expanded as other types of assets are added._

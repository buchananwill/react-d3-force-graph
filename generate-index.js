const fs = require("fs");
const path = require("path");

const typesDir = path.resolve(__dirname, "src/types");
const indexPath = path.join(typesDir, "index.ts");

fs.readdir(typesDir, (err, files) => {
  if (err) throw err;

  const exports = files
    .filter((file) => file !== "index.ts")
    .filter((file) => file.endsWith(".ts"))
    .map((file) => `export * from './${file.replace(".ts", "")}';`)
    .join("\n");

  fs.writeFile(indexPath, exports, (err) => {
    if (err) throw err;
    console.log("Index file generated successfully.");
  });
});

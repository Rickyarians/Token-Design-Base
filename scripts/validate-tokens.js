import fs from "fs";

const tokens = JSON.parse(fs.readFileSync("tokens.json", "utf8"));
const errors = [];
const hexColorPattern = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

function validateToken(node, path = []) {
  if (!node || typeof node !== "object") {
    return;
  }

  if (node.$type === "color") {
    const value = node.$value;

    if (typeof value !== "string" || !hexColorPattern.test(value)) {
      errors.push(`${path.join(".")} has invalid color value: ${JSON.stringify(value)}`);
    }

    return;
  }

  Object.entries(node).forEach(([key, value]) => {
    validateToken(value, [...path, key]);
  });
}

validateToken(tokens);

if (errors.length > 0) {
  console.error("Token validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Token validation passed");

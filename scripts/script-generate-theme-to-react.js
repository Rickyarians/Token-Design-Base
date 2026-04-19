import fs from "fs";
import * as tokens from "../build/js/tokens.js";

const theme = {
  colors: {},
  language: {}
};

Object.entries(tokens).forEach(([key, value]) => {
  if (key.startsWith("TokenColors")) {
    const name = key.replace("TokenColors", "");
    const prop = name.charAt(0).toLowerCase() + name.slice(1);

    theme.colors[prop] = value;
  }

  if (key.startsWith("TokenLanguage")) {
    const name = key.replace("TokenLanguage", "");
    const prop = name.charAt(0).toLowerCase() + name.slice(1);

    theme.language[prop] = value;
  }
});

const content = `export const theme = ${JSON.stringify(theme, null, 2)};\n`;

fs.mkdirSync("semantic/react", { recursive: true });
fs.writeFileSync("semantic/react/theme.ts", content);

console.log("✅ theme generated (fixed)");
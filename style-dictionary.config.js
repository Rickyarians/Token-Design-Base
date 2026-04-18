import StyleDictionary from "style-dictionary";

export default {
  source: ["tokens.json"],

  platforms: {
    js: {
      transformGroup: "js",
      buildPath: "build/js/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6"
        }
      ]
    }
  }
};
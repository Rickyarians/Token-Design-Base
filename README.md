# Token Design Base

Token Design Base is the source of truth repository for design tokens. Tokens are managed in Figma, stored as `tokens.json`, and generated into artifacts that can be consumed by the design system and component library.

This repository acts as a token pipeline:

1. Designers update tokens in Figma through Tokens Studio.
2. Tokens Studio syncs the token source into this repository.
3. GitHub Actions validates and builds the tokens.
4. Style Dictionary generates the JavaScript token output.
5. The semantic theme script generates the React theme.
6. The workflow sends theme updates to the component library repository through an automated pull request.

## Output

This project generates the following primary outputs:

| File | Purpose |
| --- | --- |
| `tokens.json` | Token source from Figma/Tokens Studio. |
| `build/js/tokens.js` | JavaScript token output from Style Dictionary. |
| `semantic/react/theme.ts` | Theme object for React/component library consumption. |

## Architecture

```text
Figma / Tokens Studio
        |
        v
tokens.json
        |
        v
Token validation
        |
        v
Style Dictionary build
        |
        v
build/js/tokens.js
        |
        v
React theme generator
        |
        v
semantic/react/theme.ts
        |
        v
Pull request to component library
```

## Project Structure

```text
.
+-- tokens.json
+-- style-dictionary.config.js
+-- build/
|   +-- js/
|       +-- tokens.js
+-- semantic/
|   +-- react/
|       +-- theme.ts
+-- scripts/
|   +-- script-generate-theme-to-react.js
|   +-- validate-tokens.js
+-- .github/
|   +-- workflows/
|       +-- main.yml
+-- package.json
+-- package-lock.json
+-- CHANGELOG.md
```

## Local Development

Install dependencies:

```bash
npm install
```

Validate token values:

```bash
npm run validate:tokens
```

Build Style Dictionary output:

```bash
npm run build
```

Generate React theme:

```bash
npm run generate:theme
```

Run the full local pipeline:

```bash
npm run build:all
```

## Token Validation

The validator checks all color tokens in `tokens.json`.

Accepted color formats:

- `#RGB`
- `#RRGGBB`
- `#RRGGBBAA`

If a color value does not match one of those formats, `npm run validate:tokens` fails and CI stops before generating artifacts.

## CI/CD Flow

The workflow is defined in `.github/workflows/main.yml`.

It runs on pushes to `main` when these files change:

- `tokens.json`
- `style-dictionary.config.*`
- `package.json`
- `package-lock.json`
- `scripts/**`
- `.github/workflows/main.yml`

Workflow steps:

1. Checkout repository.
2. Setup Node.js 22.
3. Install dependencies with `npm ci`.
4. Validate tokens with `npm run validate:tokens`.
5. Build tokens with `npm run build:all`.
6. Commit generated artifacts if they changed.
7. Clone `coolbuilds/React-UI-Component-Base`.
8. Copy `semantic/react/theme.ts` into the component library.
9. Push a generated branch.
10. Create a pull request to the component library.

## Component Library Integration

The generated React theme is copied to:

```text
coolbuilds/React-UI-Component-Base
+-- theme/
    +-- theme.ts
```

The workflow uses `PAT_TOKEN` from GitHub Actions secrets to clone, push, and create the pull request.

## Release Notes

Release history is documented in `CHANGELOG.md`.

Current package version:

```text
1.0.0
```

## Ownership Rules

- Edit `tokens.json` through Figma/Tokens Studio whenever possible.
- Do not manually edit generated files unless debugging the build pipeline.
- Regenerate artifacts with `npm run build:all` after changing token source or generation scripts.
- Keep CI passing before merging token changes into `main`.

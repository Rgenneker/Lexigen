---
name: Lexigen build environment
description: Required environment values for validating Lexigen production builds manually.
---

Use the registered artifact service environment when running a manual production build of Lexigen.

**Why:** The Vite configuration intentionally rejects builds that omit the runtime port or base-path settings, so a bare package build command fails before bundling.

**How to apply:** Read the artifact service environment and pass its values inline for a one-off build verification; do not alter the development workflow just to run the build.
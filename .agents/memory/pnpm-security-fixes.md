---
name: Scoped pnpm security fixes
description: How to keep pnpm audit remediation focused in this workspace
---

When a security task names one package and the workspace uses a shared pnpm catalog, update that catalog constraint and regenerate the root lockfile instead of retaining every override emitted by `pnpm audit --fix`.

**Why:** pnpm audit --fix may add overrides for unrelated advisories and rewrite the workspace YAML formatting. That creates unnecessary dependency changes and obscures the assigned remediation.

**How to apply:** First run the audit fixer to identify the patched floor, then keep only the relevant direct catalog/manifest update, regenerate the shared lockfile, and verify the named vulnerable package/version is absent across the pruned repository tree.

For major-version fixes in shared libraries such as Zod, verify the generator's output and the workspace's schema consumers before updating the catalog. The API generator's current output targets Zod 4, and the library typecheck confirms compatibility.
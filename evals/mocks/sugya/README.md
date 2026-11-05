# Mocks

Recorded answers of the real server (`apps/mcp/scripts/capture-fixtures.mjs` in the sugya monorepo), one fixed body per tool; a case overrides a tool with its own `mocks/sugya/<tool>.md` where the prompt needs a different answer. `_tools.json` is the real `tools/list`, so the mocked tools carry the real descriptions and schemas.

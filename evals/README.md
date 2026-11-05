# Eval suite

Run from the plugin root with Claude Code:

```bash
claude plugin eval . --runs 1 --ablation none          # quick, with-arm only
claude plugin eval . --runs 3                          # full, with the no-plugin baseline
```

Five positive cases (one per task skill) and four negative cases (must not rule, must not invent an out-of-library quotation, must not fire on off-topic requests). The MCP server is mocked with recorded answers of the real server (`mocks/`), so a run costs model calls only; pass `--mocks off` to run against `https://mcp.sugya.org/mcp` itself.

Mocks: `mocks/sugya/<tool>.md` answers from a recorded fixture in `mocks/sugya/fixtures/` (captured by `apps/mcp/scripts/capture-fixtures.mjs` in the sugya monorepo); `_tools.json` is the real `tools/list`. A case that needs a different answer carries its own `mocks/sugya/<tool>.md` with a copy of the fixture beside it — a mock may only read files inside its own folder.

# sugya — the Torah library for your AI

Learn Torah, Talmud and halakhah with Claude, ChatGPT or any MCP client that answers
**only from the classical library** on [sugya.org](https://sugya.org) — Tanakh, Mishnah,
Talmud Bavli and Yerushalmi with their commentaries, Midrash, Rambam, Tur, Shulchan Arukh
with Mishnah Berurah, Responsa, Musar — with an exact reference and a link on every claim.

It shows **where it is written**; it does not rule. For practical halakhah, ask a rav.

## Install

**Claude (claude.ai, desktop, mobile)** — add the connector:
[Add sugya to Claude](https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=sugya&connectorUrl=https%3A%2F%2Fmcp.sugya.org%2Fmcp)
(the form comes pre-filled with the name and `https://mcp.sugya.org/mcp`; confirm it).

**Claude Code** — the plugin, with its skills:

```bash
claude plugin marketplace add yadidish/sugya-plugin
claude plugin install sugya@sugya
```

or the bare server, without skills:

```bash
claude mcp add --transport http sugya https://mcp.sugya.org/mcp
```

**ChatGPT** — until the plugin is listed in the directory: *Settings → Security and
login → Developer mode*, then add the server `https://mcp.sugya.org/mcp`.

**Any other MCP client** — Streamable HTTP, no login: `https://mcp.sugya.org/mcp`.

## What it does

| Skill | Ask for |
| --- | --- |
| `daf-yomi` | «Learn today's daf with me» — the daf, segment by segment, Rashi where needed, review questions, shiurim |
| `chavruta` | «Learn Berakhot 2a with me as a chavruta» — leads by questions in beginner, classic or in-depth mode |
| `find-source` | «Where does ‹דעלך סני לחברך לא תעביד› come from?» — the earliest source, confirmed in the text |
| `marei-mekomot` | «What are the sources on washing hands in the morning?» — Gemara, Rambam, Shulchan Arukh, Mishnah Berurah, disagreements marked, no ruling |
| `calendar` | «When is candle lighting in Bnei Brak? What's the daf?» — Hebrew date, cycles, parasha, zmanim |
| `sugya-method` | The ground rules behind every answer: search in Hebrew, read before quoting, cite with a link, one language plus Hebrew |

The skills are text; the data comes from seven read-only MCP tools on `mcp.sugya.org`:
`search`, `fetch`, `get_links`, `calendar`, `lookup_word`, `find_resources`, `get_method`.
A client that cannot load skills gets the same methods from `get_method`.

## Honest limits

- The index is Hebrew and Aramaic. The assistant must search in Hebrew; the skills tell it to.
- Texts come back in Hebrew. Translations are the assistant's own and are marked as such.
- The library is the classical one: no modern or academic commentary, no Kabbalah or
  Chasidut beyond the classical works, no open web. «I did not find a source» is a valid answer.
- Calendar, holidays and zmanim come from [Hebcal](https://www.hebcal.com) (CC BY 4.0);
  the Daf Yomi is computed by sugya.org. Confirm halakhic times with your community.

## Evaluation

`gold/gold.json` holds 73 questions with the references a correct answer must reach;
`node scripts/gold-eval.mjs --verify` scores the live server (success@1, Recall@5/10, MRR,
empty rate) and checks that every expected reference exists and carries its phrase.
`evals/` holds the `claude plugin eval` suite — positive cases for each skill and negative
cases that must not fire or must decline — with recorded answers of the real server as mocks.

## Privacy

No account, no login. Tool calls are logged (query text, returned references, a hashed client
handle) to improve the search; see [sugya.org/privacy](https://sugya.org/privacy) and [sugya.org/terms](https://sugya.org/terms) (summary in [PRIVACY.md](PRIVACY.md)).

## Source

The server lives in the sugya.org monorepo (`apps/mcp`); this repository is the plugin —
skills, manifests for Claude and OpenAI, the gold set and the eval suite. Issues and
questions: [GitHub issues](https://github.com/yadidish/sugya-plugin/issues) or support@sugya.org.

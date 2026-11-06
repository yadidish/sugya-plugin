# sugya — the Torah library for your AI

Learn Torah, Talmud and halakhah with Claude, ChatGPT, Gemini or any MCP client that answers
**only from the classical library** on [sugya.org](https://sugya.org) — Tanakh, Mishnah,
Talmud Bavli and Yerushalmi with their commentaries, Midrash, Rambam, Tur, Shulchan Arukh
with Mishnah Berurah, Responsa, Musar — with an exact reference and a link on every claim.

It shows **where it is written**; it does not rule. For practical halakhah, ask a rav.

## Install

The server has three addresses, so you can pick what your assistant gets:

| Address | What it has | Sign-in |
| --- | --- | --- |
| `https://mcp.sugya.org/library` | the library — seven read-only tools | never |
| `https://mcp.sugya.org/me` | the library plus your own learning — twelve tools | once, when you add it (your sugya.org account) |
| `https://mcp.sugya.org/mcp` | both in one | only when a personal tool is called |

**Claude (claude.ai, desktop, mobile)** — one click fills the connector form; confirm it:

- Library only: [Add sugya to Claude](https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=sugya&connectorUrl=https%3A%2F%2Fmcp.sugya.org%2Flibrary) — choose **No sign-in**.
- With your own learning: [Add sugya (your account) to Claude](https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=sugya&connectorUrl=https%3A%2F%2Fmcp.sugya.org%2Fme) — leave **Sign in now**; Claude sends you to sign in with your sugya account right away.
- Both in one: the same form with `https://mcp.sugya.org/mcp` and **Sign in when needed** — Claude asks you to sign in the first time a personal tool is called.

**ChatGPT** (Plus and up; no developer mode needed) — *Plugins → Add → Add custom MCP server*:

- Library only: name `sugya`, URL `https://mcp.sugya.org/library`, authentication **No authentication**.
- With your own learning: URL `https://mcp.sugya.org/me`, authentication **OAuth** — ChatGPT sends you to sign in with your sugya account; when it then offers «Sign in with sugya», take it.
- `https://mcp.sugya.org/mcp` with **OAuth or no authentication** also works, but keep to one connection: if you first chose «Use without an account» and sign in later, ChatGPT holds two links and asks which one to use.

**Gemini** (gemini.google.com, a personal Google account) — *Customize → Connected Apps →
Create custom app*: paste the address, Next, tick the acknowledgment, Connect. With
`https://mcp.sugya.org/me` Gemini sends you to sign in with your sugya account (leave Client ID
and secret empty), then shows the twelve actions and «Connect» once more to save. In a chat,
name the app or pick it with «@». Custom apps in Gemini are English-only for now.

**Claude Code** — the plugin, with its skills:

```bash
claude plugin marketplace add yadidish/sugya-plugin
claude plugin install sugya@sugya
```

or the bare server, without skills:

```bash
claude mcp add --transport http sugya https://mcp.sugya.org/mcp
```

**Any other MCP client** — Streamable HTTP; OAuth 2.1 with dynamic registration or a
client-id metadata document for `/me` and `/mcp`.

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

## Your own learning (optional sign-in)

Five more tools work on your sugya.org account — `my_learning` (where you stopped, what you
marked learnt, what is due for review, saved places, this week's minutes), `mark_learned`,
`save`, `create_board` (a sugya board from the sources the assistant found) and `create_room`
(a chavruta room or a lesson, with the link). They live on `/me` (sign-in when you add the
server) and on `/mcp` (sign-in the first time one is called): the client sends you to
`mcp.sugya.org/authorize`, you sign in with the account you use on the site (Google or a
one-time link) and tick what the assistant may do — `learning`, `boards`, `rooms`. The
assistant gets a key for those tools only — never your password or your site session — and
you can disconnect it in the client's connector settings. The library works without any of this.

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

The library needs no account. Tool calls are logged (query text, returned references, a hashed
client handle; with sign-in, your account id) to improve the search; see [sugya.org/privacy](https://sugya.org/privacy) and [sugya.org/terms](https://sugya.org/terms) (summary in [PRIVACY.md](PRIVACY.md)).

## Source

The server lives in the sugya.org monorepo (`apps/mcp`); this repository is the plugin —
skills, manifests for Claude and OpenAI, the gold set and the eval suite. Issues and
questions: [GitHub issues](https://github.com/yadidish/sugya-plugin/issues) or support@sugya.org.

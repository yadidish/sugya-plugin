# Privacy policy — sugya MCP server and plugin

*Last updated 2026-11-05. The policy that binds is the one on the site: [sugya.org/privacy](https://sugya.org/privacy) and [sugya.org/terms](https://sugya.org/terms); this file is the server-specific summary.*

The sugya plugin connects an AI assistant (Claude, ChatGPT, Claude Code, Codex or any MCP
client) to the MCP server at `https://mcp.sugya.org/mcp`, operated by sugya.org. The server
serves a public library of classical Torah texts. There is no account and no login.

## What the server receives

Every tool call carries the arguments the assistant sends: a search query, a reference, a
word, a date, a city name, or a question to look up in a Q&A archive. The server also sees
the technical headers of the request — the calling platform's user agent and network address.

## What the server keeps

To improve the search and the methods, the server logs every tool call **without a retention
limit**: the tool name, its arguments (including the text of a query), the references or
links it returned, the time it took, and the client family (Claude, OpenAI, browser, other).

The network address is **not** stored. In its place the log keeps a one-way hash of the
address together with the user agent, so that a search followed by a read can be recognised
as one session; the hash cannot be turned back into an address. No name, email or account
is attached to any row, because the server has none.

The log is read only by the operator of sugya.org, for evaluating and improving the search
and the written methods, and is not sold or shared.

## Third parties the server calls on your behalf

Some tools fetch from other services while answering; those services see the request the
server sends, which carries the query or reference, and the server's own address, never yours:

- **Sefaria** (sefaria.org) — the connection graph (`get_links`) and the Jastrow dictionary (`lookup_word`).
- **Hebcal** (hebcal.com) — the Hebrew date, holidays, learning cycles, candle lighting and
  zmanim (`calendar`), including the date and city name you gave.
- **sugya.org** — the dictionary and the shiur index.

`find_resources` returns links to other sites (dafyomi.co.il, daf-yomi.com, toldot.com,
din.org.il, dinonline.org, hidabroot.org, ohr.edu); the server does not contact them, and
opening a link is subject to that site's own policy.

## Caching

Answers from Sefaria, Hebcal and the static data are cached at the edge for up to a day,
keyed by the request, with no user information.

## Rate limits

Calls are rate-limited by client family and network address to protect the service.
The limit does not identify a person.

## Contact

support@sugya.org

<a id="terms"></a>

## Terms of use

The server and plugin are provided as they are, free of charge, for study. The texts are
served under the licence of each edition, named in every tool result; quote them with their
attribution. The assistant's answers are not halakhic rulings: for practical halakhah, ask a
competent rav. The operator may change or withdraw the service at any time.

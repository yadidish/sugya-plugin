---
name: find-source
description: Find where a Hebrew or Aramaic phrase, saying, verse, halakhic principle or abbreviation comes from in the classical Torah library — the earliest source, confirmed by reading the text, with the reference and link. Use when someone asks «where is this from», «who said», «which daf», «what does this abbreviation stand for», or quotes a line and wants its origin.
---

# Finding a source

Follow the sugya method (`sugya-method`).

1. **Search the exact phrase first**, in Hebrew, with final letters as the person wrote them.
   If they wrote it in transliteration or translation, put it back into the Hebrew words the
   source would use before searching («what is hateful to you» → «דעלך סני»). Pass the
   `category` the phrase belongs to — `talmud` for a saying of the Sages, `mishnah` for a
   Mishnah or Pirkei Avot, `tanakh` for a verse — so the base text is not crowded out by its
   commentaries; search again without a category if that slice is empty.
2. **If nothing comes back**, drop the least certain word and search again; then try the
   classical spelling (single yod, single vav: «ידים» not «ידיים»; «קורין» not «קוראים»);
   then a shorter key phrase of two or three rare words.
3. **Fetch the best hit and confirm** that the phrase actually appears in the fetched text
   before naming it as the source. Quote the line as it stands.
4. **Earliest first.** Tanakh before Mishnah before Gemara before later works; then where the
   phrase is quoted or reworked (a Mishnah quoted in the Gemara, a Gemara cited by the Rambam
   or the Shulchan Arukh). `get_links` on the source lists who quotes it.
5. **Several places?** List them with their references; say which is the original wording
   and which are parallels. A phrase that appears in many sugyot is said so.
6. **An abbreviation** («רשב"א», «א"ל», «ס"ל»): give the expansions that fit the context and
   a source where it is used, not a guess. For a book or author abbreviation, name the work
   and the century.
7. **Not found** after the three attempts: say so plainly, show what was searched, and
   suggest what the person could add (a rarer word, the tractate they remember).

Never present a source you did not fetch. Never «correct» the person's quotation from memory —
show the fetched wording next to theirs.

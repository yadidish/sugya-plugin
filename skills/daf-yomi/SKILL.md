---
name: daf-yomi
description: Learn a daf of Gemara with a person — today's Daf Yomi or any daf they name — segment by segment with the Hebrew, a plain translation, Rashi where needed, review questions, and shiurim to listen to. Use when someone wants to learn, review or prepare a daf, or asks what today's daf is.
---

# Learning a daf

Follow the sugya method (`sugya-method`). Then:

1. **Find the daf.** If the person did not name one, call `calendar` and take `dafYomi.id`
   (for example «Bekhorot 48a»). Tell them which daf it is and give its link. If they say
   «continue» or «where did I stop», call `my_learning` first: the trail names the daf and the
   stop they were on, and `today.dafYomi.learned` says whether today's daf is already marked.
2. **Read it.** Call `fetch` on the daf reference («Berakhot 2a») to get its segments in
   order. A daf is one side; the person may want both — the second side is «2b».
3. **Open with the question.** Before any text, say in one sentence what the sugya is asking —
   taken from the fetched segments, not a background lecture about the tractate from memory.
4. **Go segment by segment.** For each step: the Hebrew as written, a plain translation, and
   what the step does in the argument — question, answer, proof, objection, resolution.
   Keep the person's level: a beginner gets every word; someone who learns gets the moves.
5. **Rashi where a word or a step is unclear.** Fetch «Rashi on <daf reference>» and say that
   it is Rashi. Tosafot («Tosafot on <daf reference>») only when the person asks for depth or
   a contradiction needs it.
6. **Stop at a natural break** — the end of a sugya, a new Mishnah — and ask whether to go on.
   Do not summarise a whole daf in one reply.
7. **A word they stumble on:** `lookup_word`. **A shiur to listen to, or review questions and
   a quiz from Kollel Iyun Hadaf:** `find_resources` with `kind: "shiur"` (pass their
   language) or `kind: "review"` and the daf. Hand over the links; do not describe a shiur
   you have not heard.
8. **End a sugya with three review questions**, answerable from the text alone, and offer
   the answers when asked. When the daf is done, offer — do not do — `mark_learned`: «Mark
   Bekhorot 48a learnt?» The mark schedules its reviews (1, 3, 7, 16, 35 days); a review the
   person completes with you is `mark_learned(action: "reviewed")`.

What not to do: no introduction about the tractate or the topic from memory — the fetched text
is the lesson; no Steinsaltz-style paraphrase presented as the Gemara's words; no
«the Gemara concludes» without the segment that concludes it; no halakhic bottom line —
if the sugya has a practical upshot, point to the Shulchan Arukh through `get_links` and
add the rav line.

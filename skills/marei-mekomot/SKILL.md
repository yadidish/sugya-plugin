---
name: marei-mekomot
description: Lay out the sources on a question of halakhah — Gemara, Rambam, Shulchan Arukh and Rema, Mishnah Berurah and the other commentaries, with disagreements marked — without ruling. Use for any «is it permitted», «may I», «what is the halakhah», «what does the Shulchan Arukh say» or «where is the law of X» question — also when the person asks for a bare yes or no, or says no sources are needed: the answer is still sources, never a ruling.
---

# Marei mekomot

Follow the sugya method (`sugya-method`); its rule 4 governs everything here: show where it
is written, never «permitted» or «forbidden».

1. **Find the siman.** Search the subject in Hebrew (two to four words: «נטילת ידים שחרית»,
   «הדלקת נרות שבת») with `category: "shulchan-arukh"` — the Shulchan Arukh and everything
   written on it, Mishnah Berurah included; `mishneh-torah` for the Rambam, `halakhah` for
   the whole halakhic shelf. Prefer hits in «Shulchan Arukh, …»; a hit in Mishnah Berurah or
   Arukh HaShulchan names the siman too. If the search finds only Gemara, `get_links` on the Gemara
   segment with `category: "Halakhah"` leads to the codes.
2. **Fetch the siman** («Shulchan Arukh, Orach Chayim 4») and the Mishnah Berurah on it
   («Mishnah Berurah 4»); for a single se'if, the se'if («… 4:2») and `get_links` on it.
3. **Lay out in order**, each with its own words quoted:
   - the Gemara, if a hit shows it;
   - Rambam (Mishneh Torah);
   - Shulchan Arukh and Rema;
   - the commentaries — Mishnah Berurah, Magen Avraham, Taz, Shakh, Arukh HaShulchan,
     Kaf HaChayim and Ben Ish Hai for Sephardi practice; Biur Halakhah and Sha'ar HaTziyun
     where the Mishnah Berurah points to them.
4. **Mark the disagreements:** who holds what, and who follows whom (Ashkenaz / Sepharad,
   Mishnah Berurah / Arukh HaShulchan). A single opinion is not «the halakhah».
5. **Say what is not there.** A detail the sources do not address, or a modern case they
   predate, is stated as such — not bridged with reasoning of your own.
6. **Questions already answered by rabbis:** `find_resources` with `kind: "qa"` gives the
   search pages of the answer archives (din.org.il, dinonline.org, Toldot, Hidabroot, Ohr
   Somayach). Offer the links; do not summarise an answer you have not opened.
7. **The last line is always:** *For practical halakhah ask a competent rav.* A question of
   life, health, marriage, mourning or money gets that line first as well as last.

Never conclude. Never rank the opinions by your own reasoning. Never quote a code from memory.
A person who insists on «just yes or no» gets, kindly, the same: what the sources say, where, and the rav line — not a verdict, and not a summary of «what most poskim hold» from memory.

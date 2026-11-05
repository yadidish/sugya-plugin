---
name: calendar
description: The Jewish calendar for a date and place — Hebrew date, today's Daf Yomi and the other daily learning cycles, the coming parasha, holidays, candle lighting, havdalah and zmanim — from the sugya calendar tool, never from memory. Use for «what's today's daf», «when is Shabbat», «what parasha is this week», «zmanim in …», «when is Rosh Chodesh», or any date conversion.
---

# Calendar

Follow the sugya method (`sugya-method`). Calendar facts come from the `calendar` tool only:
do not compute a Hebrew date, a daf or a sunset yourself.

1. **Call `calendar`** with the date (YYYY-MM-DD; omit for today) and, when times are asked
   or the place is known, the city («Jerusalem», «Bnei Brak», «Lakewood», «London»). Without a
   city there are no candle-lighting times and no zmanim — ask for the city rather than guess.
2. **Answer what was asked, then one line more.** «What's the daf?» → the daf with its link,
   then the Hebrew date. «When is Shabbat?» → candle lighting and havdalah with the city
   and the parasha. Zmanim are given as local times with the name of the zman as the tool
   names it (sof zman Shema — Magen Avraham / Gra, and so on).
3. **The learning cycles** (Mishnah Yomit, Rambam Yomi, Kitzur, Arukh HaShulchan, Chofetz
   Chaim, Shemirat HaLashon, Nach Yomi, Tehillim) are offered as references the person can
   `fetch` and learn; offer to open one.
4. **Holidays:** the tool follows the Israeli or the diaspora scheme by the city it was given.
   Say which applies when it matters (second day of Yom Tov).
5. **Attribution:** the calendar, holidays, parasha and zmanim come from Hebcal; say so once
   when zmanim are given. The Daf Yomi is computed by sugya.org.
6. **A date that fails** (a wrong format, a city the tool cannot place) is reported with
   what to send instead.

Zmanim are for orientation; for a time that matters halakhically (candle lighting, the end of
Shabbat, a fast), tell the person to confirm with their community's calendar and rav.

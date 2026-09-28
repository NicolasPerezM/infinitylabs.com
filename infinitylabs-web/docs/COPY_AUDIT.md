# COPY AUDIT — Spanish, English, French

Date: 2026-09-28 · Scope: every user-facing string in `src/i18n/dictionaries/{es,en,fr}.ts` and `src/content/*` (1 758 strings, ~19 500 words across three languages).

## 1. Frameworks used, and why these

Copywriting frameworks are not interchangeable. These five were selected against our specific situation: a high-consideration B2B sale, technical buyers, no published proof yet, three languages.

| Framework | What it governs here | Why it fits |
|---|---|---|
| **Strategic narrative** (Andy Raskin: shift in the world → winners and losers → promised land → how you get there → evidence) | The homepage spine | Our differentiator is a *point of view* ("AI as a system, not as magic"), not a feature list. The narrative is literally the section order: the gap → the operating model → the solutions → how we build → proof of method. |
| **Positioning before messaging** (April Dunford: competitive alternatives → unique attributes → value → who cares most) | Solution and capability pages | The buyer's alternative is not "another AI vendor", it is "a pilot that never ships" or "a marketing agency". The `pilot / production system` ledger is that comparison, made explicit. |
| **Rule of One** (one reader, one idea, one promise, one offer per page) | Page-level discipline | Every page has exactly one primary CTA and one governing idea. Secondary links never compete visually with the primary action. |
| **Voice of customer** (Copyhackers / Wiebe: write the problem in the buyer's words before writing the solution) | The `problem[]` array on every solution | Each solution opens with three sentences a COO would actually say, not with our capability. |
| **Plain language** (ISO 24495-1:2023; inverted pyramid) | Sentence construction | Conclusion first, active voice, concrete nouns, one idea per sentence. Applied to all three languages. |

Deliberately **not** used: PAS (problem-agitate-solution) and AIDA. Both depend on emotional agitation, which reads as manipulative to a CIO and contradicts the brand's "calm, engineered" personality.

## 2. Measurement method

Every string is extracted from the source modules and measured per language with the locale's own readability formula, because Flesch Reading Ease is only valid for English:

- **Spanish** — Fernández-Huerta (Flesch adaptation for Spanish). Business-text target: 60–70 ("normal").
- **English** — Flesch Reading Ease. Technical B2B target: 40–55; hero and navigation copy should sit higher.
- **French** — Kandel-Moles (Flesch adaptation for French). Business-text target: 50–65.

Spanish and French expand roughly 20 % over English for the same content, so absolute sentence counts are not comparable across languages; the thresholds are.

Automated checks per language: sentence length distribution, banned-hype-word list, technical-primitive leakage, unsupported numbers, register consistency (tú/usted, tu/vous), duplicate strings, cross-language parallelism of every H1, H2 and CTA.

## 3. Findings and corrections

| # | Finding | Severity | Correction |
|---|---|---|---|
| 1 | 23 sentences over 28 words (9 ES, 3 EN, 11 FR). Worst: 47 words (FR), 44 (ES), 41 (EN) — all in the operating-model and capability descriptions | High. Long sentences are where technical writing loses a COO | Split into 2–3 sentences each, conclusion first. Remaining: 3 ES, 0 EN, 1 FR, all deliberate parallel enumerations of typed steps |
| 2 | English readability 45 ("difficult") | Medium | Splitting raised clause-level readability; the score stays at 45 because the vocabulary is intentionally technical (evaluation, observability, orchestration). Acceptable for the CTO half of the audience; hero and nav copy measure far higher |
| 3 | Hero lede opened with the company name in all three languages, spending the most valuable line on self-reference | Medium | Rewritten to open with the verb the buyer cares about: "We design, build and operate…" |
| 4 | "Nobody inherits someone else's work" / "You end with a plan an engineering team can execute" were missing: the model and Sprint ledes described activity, not outcome | Medium | Added one outcome sentence to each |
| 5 | "It is written so an engineering team can start, not so a board can nod" — the second clause was a swipe at the buyer's own board | Low but real | Changed to "…can start on Monday". Concrete, no insult |
| 6 | The pilot column ended with "No owner after the demo", breaking the verb-first parallelism of the other three items | Low | "Left without an owner" / "Se queda sin dueño al terminar" / "Reste sans propriétaire à la fin" |
| 7 | Banned hype words (revolutionize, unlock the power, cutting-edge, empower, next-generation, seamless, and the Spanish/French equivalents) | — | **Zero occurrences** in all three languages, before and after |
| 8 | Unsupported numbers | — | **Zero**. The only digits are the 404 label, company-size ranges in the form, and the Colombian statute number |
| 9 | Technical-primitive leakage ("prompt") | Low | Four occurrences, all inside "how we work" sections where the brand rules permit technical vocabulary. Never in an offer or headline |
| 10 | Register consistency | — | Spanish addresses the reader as **tú** throughout (48 instances, 0 usted). French uses **vous** throughout (55 instances). The single flagged case in each was a false positive (third-person "sus procesos"; the noun "ton" in "un ton cohérent") |
| 11 | Cross-language parallelism | — | All 9 H2s, all CTAs and all section labels verified as faithful equivalents, not literal translations. Product names (AI Opportunity Sprint, Managed AI, NOIT, Möbius) are deliberately untranslated |

## 4. Results

| Metric | ES | EN | FR | Target |
|---|---|---|---|---|
| Words per sentence | 9.7 | 8.8 | 10.0 | ≤ 18 |
| Readability | Fernández-Huerta 62 | Flesch 45 | Kandel-Moles 56 | 60–70 / 40–55 / 50–65 |
| Sentences > 28 words | 3 | 0 | 1 | ≤ 3 |
| Banned hype words | 0 | 0 | 0 | 0 |
| Unsupported numbers | 0 | 0 | 0 | 0 |
| Register inconsistencies | 0 | — | 0 | 0 |

## 5. Standing rules for new copy

1. One idea per sentence. If a sentence needs a second comma-separated clause to finish its thought, split it.
2. Conclusion first. The first sentence of a section answers the question; the rest supports it.
3. Write the problem in the buyer's words before writing what we do.
4. One primary CTA per page. Everything else is a text link.
5. No number on the site without a client-approved source.
6. Spanish addresses the reader as **tú**; French as **vous**; English uses "you" and "we", never "the client".
7. Product names are never translated. Stage names always are.
8. Technical vocabulary belongs in "how we work" sections, never in an offer name or a headline.
9. New copy is written in the three languages in the same commit, or it does not ship.

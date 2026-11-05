---
type: regex
target: trace
pattern: 'mcp__[\w-]*sugya[\w-]*__(search|fetch|get_links|calendar|lookup_word|find_resources)'
match: not_contains
arm: both
---

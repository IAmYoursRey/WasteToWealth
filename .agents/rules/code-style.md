# WasteToWealth Code Style

Production code must read like ordinary experienced engineering work.

Do not:
- add explanatory comments such as "// this API handles..." or "// this is for..."
- add decorative section comments
- add AI-authored narration inside source files
- pad files with excessive blank lines
- use verbose names only to explain trivial code
- create prose-heavy constants or metadata solely for explanation
- leave TODO comments that merely describe work already completed

Comments are allowed only when the reason is non-obvious and would materially help future maintainers.

Prefer:
- existing repository conventions
- compact functions
- clear naming
- local consistency
- small diffs
- explicit types
- configuration separated from business logic
- predictable error handling

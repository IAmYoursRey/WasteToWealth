# No Parentheses in UI Labels

## Description
When creating or modifying User Interface elements, NEVER use parentheses `()` to enclose text, labels, hints, or descriptions.

## Examples
**INCORRECT**:
- `placeholder="Search for school (e.g. SMAN 1 Ngoro)..."`
- `<span>SD / MI (Cyan)</span>`
- `<button>Submit (Optional)</button>`

**CORRECT**:
- `placeholder="Search for school..."`
- `<span>SD / MI</span>`
- `<button>Submit</button>`

## Rationale
The user prefers a very clean, minimalist UI design and considers text enclosed in parentheses to be visual clutter. Keep labels and placeholders as concise as possible.

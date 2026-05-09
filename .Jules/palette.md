## 2026-02-05 - Form Accessibility Pattern
**Learning:** Form inputs in this template often rely solely on placeholders, and submission status is only communicated visually (via button changes), which is inaccessible to screen reader users.
**Action:** Always add semantic `<label>` elements (linked via `id` and `htmlFor`) and an `aria-live="polite"` region for form submission feedback.

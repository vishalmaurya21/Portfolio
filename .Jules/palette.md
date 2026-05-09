## 2026-02-02 - [Accessible Form Patterns]
**Learning:** Modern portfolio templates often prioritize visual minimalism by using placeholders instead of labels, which breaks accessibility for screen reader users and users with cognitive disabilities.
**Action:** Always add visually hidden labels (using Tailwind's `sr-only`) to form inputs that rely solely on placeholders.
## 2025-05-15 - [Accessibility Gaps in Interactive Components]
**Learning:** Found that interactive `motion.div` elements used for project cards lacked `role="button"`, `tabIndex`, and keyboard event handlers. Additionally, form inputs relied solely on placeholders without accessible labels.
**Action:** Always ensure `motion.div` elements with `onClick` handlers also have `role="button"`, `tabIndex={0}`, and `onKeyDown` (Enter/Space). Use `sr-only` labels for form inputs even when placeholders are present to satisfy screen reader requirements.
## 2026-02-05 - Form Accessibility Pattern
**Learning:** Form inputs in this template often rely solely on placeholders, and submission status is only communicated visually (via button changes), which is inaccessible to screen reader users.
**Action:** Always add semantic `<label>` elements (linked via `id` and `htmlFor`) and an `aria-live="polite"` region for form submission feedback.

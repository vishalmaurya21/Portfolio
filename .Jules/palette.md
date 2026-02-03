## 2025-05-15 - [Accessibility Gaps in Interactive Components]
**Learning:** Found that interactive `motion.div` elements used for project cards lacked `role="button"`, `tabIndex`, and keyboard event handlers. Additionally, form inputs relied solely on placeholders without accessible labels.
**Action:** Always ensure `motion.div` elements with `onClick` handlers also have `role="button"`, `tabIndex={0}`, and `onKeyDown` (Enter/Space). Use `sr-only` labels for form inputs even when placeholders are present to satisfy screen reader requirements.

# I18n Translation Rule

When adding or modifying navigation items, pages, or components that use the `t()` translation function from `I18nContext`, ALWAYS remember to:
1. Update `apps/web/src/context/I18nContext.tsx` or the corresponding locale files.
2. Add the translation keys for BOTH `id` (Indonesian) and `en` (English).

Failure to do this will result in the raw translation key (e.g. `nav.maps`) being displayed to the user.

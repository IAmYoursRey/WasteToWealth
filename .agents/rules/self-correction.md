# WasteToWealth Self-Correction

Every agent that changes code must:
1. inspect the relevant implementation;
2. make the smallest safe change;
3. run targeted validation;
4. inspect the result;
5. if it fails, diagnose the failure;
6. repair its own change when the failure is within its scope;
7. repeat validation;
8. hand off only when the issue belongs to another specialist or requires a product decision.

Never hide a failure by weakening tests, disabling lint rules broadly, deleting functionality, or changing the requirement.

If the same fix fails twice, stop and escalate to the lead with evidence.

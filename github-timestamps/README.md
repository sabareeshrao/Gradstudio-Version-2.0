# GitHub Timestamps — UI preview

A standalone, modular GitHub-inspired repository replay. This first demo uses a **fictional Java mini-orders project** rather than Spring PetClinic. It is intentionally separated into HTML, CSS, JavaScript and source data.

Run locally with `python -m http.server 8000`, then visit `/`.

- Resizable, full-height GitHub-style file tree
- Compact global time labels (D01 23:59 -> D02 00:00)
- Auto switch between editor and a 25% terminal for actual shell actions
- One event per simulated minute; custom positive lines/sec speed (default 4)
- Wrap / unwrap with hanging indentation, next to the time Jump button
- Add/delete animations: strike a line as one timed step, remove it as the next timed step
- Hybrid sequencing labels: small commit = Git patch order, larger commit = logical reconstruction
- File snapshot time travel, syntax highlighting and line navigation
- File path-only bar; Selected, Copy, Download controls in the step toolbar

**Important:** The demo commit SHAs and terminal output are fictional. The simulation does not run shell commands or connect to a GitHub repository. Real Spring PetClinic history will only be imported after UI review.
# Claude Code Training — Session 1 Homework

**Complete all four assignments before Session 2.**
**Time needed: ~45-60 minutes total**

All assignments use the `cloud-status-api` demo repo. Open your terminal, navigate to the repo, and run `claude` to start.

---

## Assignment 1: Explore the Codebase (10 min)
**Mode: Chat (default)**

Run these three prompts. Read Claude's responses and note anything surprising.

**Prompt A — Trace a request:**
```
Trace how a request flows from hitting GET /api/v1/status to returning
a response. Walk through every file it touches: middleware, handler,
database query, cache check. Show me the exact code path.
```

**Prompt B — Categorize the project:**
```
List every file in this project and categorize them:
Application code, Infrastructure (Terraform), CI/CD, Database,
Documentation, Operations, Monitoring, Tests.
Which categories are well-covered? Which are dangerously thin?
```

**Prompt C — Summarize the operational docs:**
```
Read ALL files in the docs/ directory and db-exports/ directory.
What's the overall health of this service? Summarize the key
findings across all operational documents in one page.
```

---

## Assignment 2: Security & Reliability Audit (15 min)
**Mode: Plan Mode (Shift+Tab twice, or type /plan)**

This is the most important assignment. **Save the output — we use it in Session 2.**

```
Conduct a full audit of this project. Read everything — code,
config, Terraform, Docker, CI pipeline, migrations, docs,
database exports, incident reports, change logs.

Produce a prioritized findings report:
- Security issues (hardcoded secrets, auth problems)
- Reliability risks (error handling, single points of failure)
- Database concerns (from the health report and slow queries)
- Operational gaps (from the incident postmortem and on-call handoff)
- Cost issues (from the AWS cost report)
- Process problems (from the change request log)

For each finding:
- Severity: Critical / High / Medium / Low
- Affected file(s)
- What the issue is
- What the fix should be
```

**How to save the output:** Copy Claude's response and paste it into a file, or ask Claude:
```
Save that audit report to a file called audit-report.md
```

---

## Assignment 3: Create a CLAUDE.md (10 min)
**Mode: Chat (default)**

**Option A — Let Claude generate it:**
```
/init
```
Follow the prompts. Claude reads the project and creates a CLAUDE.md.

**Option B — Write it yourself** using this template:
```markdown
# CLAUDE.md — cloud-status-api

## Project Overview
[2-3 sentences about what this service does]

## Tech Stack
[List the technologies]

## Commands
- Install: npm install
- Test: npm test
- Lint: npm run lint
- Local run: docker-compose up

## Rules
[Add at least 2 team rules, for example:]
- Never hardcode secrets — use environment variables
- Tag ALL AWS resources with team, environment, cost-center
```

**Test it:** After creating your CLAUDE.md, ask Claude:
```
Write a function to connect to the database.
```
Does it follow your rules? If your CLAUDE.md says "never hardcode secrets," does Claude use environment variables? If not, adjust your CLAUDE.md and try again.

---

## Assignment 4: Build Something (15 min)
**Mode: Chat (default)**

Build one of the following as a single HTML file. Open it in your browser and **share a screenshot in #claude-code-training on Slack.**

**Option A — Deltek Cloud Status Dashboard:**
```
Read the operational docs in docs/ and db-exports/. Build a single HTML
page: "Deltek Cloud Status Dashboard" showing:
- 8 Deltek services (Costpoint, Vantagepoint, Maconomy, Dela AI,
  GovWin IQ, Cobra, Replicon, API Gateway) with status indicators
  based on what you learned from the operational docs
- An incident feed using real incidents from the postmortem and
  on-call handoff
- A database health section from the DB report
- Dark theme, professional, responsive
- Use Deltek brand colors: navy (#0B1437), blue (#1742F6), teal (#00B6C3)
```

**Option B — Incident Timeline:**
```
Read docs/incidents/INC-2843-postmortem.md, docs/operations/oncall-handoff-may12-18.md,
and docs/operations/change-requests-apr-may2026.md. Build a single HTML page
showing an "Incident Timeline" for the past 30 days. Include:
- Vertical timeline with all incidents
- Each incident: timestamp, severity badge (color-coded P1-P4),
  affected service, title, status, duration
- Link change requests to incidents they caused
- Filter by severity and service
```

**Option C — Cost & Tagging Report:**
```
Read db-exports/aws-cost-report-may2026.csv. Build a single HTML page
showing a "Cloud Cost & Compliance Dashboard" with:
- Total monthly cost
- Cost breakdown by resource type (bar chart or table)
- Tagging compliance: which resources pass, which fail
- Waste identification: stopped instances, oversized dev resources
- Recommendations section
```

---

## Bonus: Try These If You Have Extra Time

**Roast the postmortem (everyone loves this one):**
```
Read docs/incidents/INC-2843-postmortem.md. Be brutally honest:
- Were the action items sufficient?
- What's the root-root cause?
- Rate our incident response 1-10 and explain why.
```

**Brief me for on-call:**
```
Read docs/operations/oncall-handoff-may12-18.md and
db-exports/db-health-report-may2026.md. I'm taking over on-call
Monday morning. Give me a 2-minute briefing: what needs my
attention first, what's coming up, what should I be worried about?
```

**Find the money leaks:**
```
Read db-exports/aws-cost-report-may2026.csv. Which resources are
missing required tags? Which look like waste? What are the top 3
cost reduction opportunities with estimated savings?
```

---

## Tips

- **Shift+Tab** cycles between permission modes (Approval → Auto-Accept → Plan Mode)
- **Esc** interrupts Claude if it's going in the wrong direction
- **/help** shows all available commands
- **/compact** frees up context window if Claude seems slow
- If Claude's output isn't great, **refine your prompt** — be more specific about what you want

---

## Questions?

Post in **#claude-code-training** on Slack, or reach out to **Leo** or **Gourav Kapoor**.

See you at Session 2!

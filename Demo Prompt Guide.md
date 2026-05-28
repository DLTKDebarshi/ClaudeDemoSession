## 2. Practice the Demos (DO THIS BEFORE THE SESSION)

This is the most important part. **Run every demo prompt at least twice before the session.** Claude's output varies each time, so you need to know what it typically produces and what surprises might come up.

### Setup
```
cd cloud-status-api
claude
```

### Demo 1: Operational Runbook (Chat Mode, ~2-3 min to generate)

Run this prompt:
```
Read this entire codebase — source code, Terraform, Docker, CI config,
migrations, monitoring config, and all docs. Generate a complete
operational runbook for the cloud-status-api service.

Include:
- Service overview and purpose
- Architecture (components, data flow, dependencies)
- Environment variables (cross-reference code, docker-compose, and Terraform)
- How to deploy (from the CI pipeline)
- How to rollback
- Monitoring and alerting (from the Datadog config)
- Database operations (from migrations and the health report)
- Common failure modes (from the incident postmortem and on-call handoff)
- Troubleshooting steps for each failure mode
- Contacts and escalation paths (from the on-call handoff)
```

**Expected time:** 2-3 minutes. Claude will read 25+ files. This is the longest demo.

**What to look for in the output:**
- Does it find env vars in code AND docker-compose AND Terraform?
- Does it reference the postmortem (INC-2843) in the failure modes section?
- Does it include contacts from the on-call handoff?

If any of these are missing, adjust the prompt — add "Make sure to read the docs/ and db-exports/ directories."

### Demo 2: Incident Command Center (Plan Mode → Execute, ~3-4 min total)

**Switch to Plan Mode first** (Shift+Tab twice or /plan)

Phase 1 prompt:
```
Read the incident postmortem in docs/incidents/, the on-call handoff in
docs/operations/, and the change request log. Plan an Incident Command
Center — a single HTML page for the Cloud team.

It should display:
- A header with "Deltek Incident Command Center"
- Summary stats: active incidents, resolved this month, MTTR
- A timeline of all incidents from the postmortem, handoff, and change log
- Each incident: ID, timestamp, severity (P1-P4), affected service
  (use real Deltek names: Costpoint, Vantagepoint, Maconomy, etc.),
  title, status, duration, and root cause
- Color-coded severity badges
- Filter by severity and by service
- Professional dark theme, responsive

Plan the structure first. Do not create any files.
```

**Expected time for plan:** ~1 minute. Review the plan out loud with the audience.

Phase 2: Exit plan mode (Shift+Tab), then:
```
The plan looks good. Go ahead and build it.
```

**Expected time for build:** ~2 minutes. Open the HTML file in browser when done.

### Demo 3: Database Migration Plan (Plan Mode, ~1-2 min)

**Stay in Plan Mode** (or re-enter with Shift+Tab)

```
Read three things:
1. The database schema in migrations/001_initial_schema.sql
2. The database health report in db-exports/db-health-report-may2026.md
3. The slow query log in db-exports/slow-queries-may2026.csv

The health report shows the service_status table is 48M rows / 21 GB
with 34% bloat and no partitioning. We need to fix this.

Plan a migration to:
- Partition the service_status table by month
- Add the missing index on checked_at
- Address the 34% bloat
- Evaluate whether the unused primary key index (3.2 GB) can be dropped

For each step, include:
- The exact SQL
- Risk assessment (will it lock the table? for how long?)
- Rollback instructions
- Whether it requires a maintenance window or can run online
```

**Expected time:** 1-2 minutes. This one is fast because it's plan-only (no file creation).
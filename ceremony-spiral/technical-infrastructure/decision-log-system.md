# Decision Log System: Technical Documentation

**Purpose:** Document every significant decision with multiple perspectives, relational impact, and accountability mechanisms.

**Location:**
- Schema: `ceremony-spiral/technical-infrastructure/decision-log-schema.json`
- Active log: `ceremony-spiral/decisions/decision-log.jsonl`
- Decision tracking: `ceremony-spiral/decisions/2025-11-20-decision-tracking.md`

---

## Why This System Exists

**Traditional decision logs capture:**
- What was decided
- Who decided it
- When it happened

**Ceremony Spiral decision logs capture:**
- All of the above PLUS
- **Multiple perspectives** that informed the decision (technical, community, business, partnership, research, product)
- **Relational impact** - who is affected, how we're honoring relationships, what accountability we maintain
- **Reversibility** - how easily we can change course, what would trigger reconsideration, when we'll revisit

This embodies the principle: **Decisions are not endpoints; they're commitments to relationships that may evolve.**

---

## Schema Overview

### Required Fields

```json
{
  "id": "UUID for this decision",
  "timestamp": "ISO 8601 datetime",
  "decision": "Clear statement of what was decided",
  "decision_makers": [
    {"name": "Person Name", "role": "Their role in decision"}
  ],
  "perspectives_considered": {
    "technical": "...",
    "community": "...",
    "business": "...",
    // At least 2 perspectives required
  },
  "rationale": [
    "Reason 1",
    "Reason 2"
  ],
  "relational_impact": {
    "affected_parties": ["Who is affected"],
    "how_honoring": "How we honor relationships",
    "accountability_maintained": "What accountability mechanisms"
  },
  "reversibility": {
    "ease": "high|medium|low",
    "triggers": ["What would trigger reconsideration"],
    "revisit_date": "YYYY-MM-DD"
  }
}
```

### Optional But Recommended Fields

- `phase`: Which development phase (Phase 1-4, Cross-Phase)
- `decision_type`: Strategic, Technical Architecture, Team & Roles, etc.
- `tags`: For querying and filtering
- `related_decisions`: IDs of related decisions
- `status`: proposed, decided, implementing, revisited, reversed
- `notes`: Additional context

---

## How to Use This System

### 1. Making a Decision (Real-Time)

When your team makes a significant decision:

1. **During discussion:** Note the multiple perspectives being raised
2. **After deciding:** Immediately capture:
   - What we decided
   - Who was involved
   - Which perspectives we considered
   - Why we chose this path
   - Who is affected and how we'll honor relationships
   - When we'll revisit this

3. **Document in JSONL format:** One line per decision in `decision-log.jsonl`

**Example workflow:**

```bash
# During Nov 20 session, team decides something
# Immediately after, someone (often Jerry) captures it:

echo '{"id":"nov20-decision-001", ...}' >> ceremony-spiral/decisions/decision-log.jsonl

# Validate against schema:
# (Use JSON schema validator of your choice)
```

### 2. Querying Decisions

**By decision type:**
```bash
grep '"decision_type":"Strategic"' decision-log.jsonl | jq .
```

**By phase:**
```bash
grep '"phase":"Phase 1: Foundational"' decision-log.jsonl | jq .
```

**By tag:**
```bash
grep '"anthropic"' decision-log.jsonl | jq .
```

**By date range:**
```bash
# Decisions made in November 2025
grep '"timestamp":"2025-11-' decision-log.jsonl | jq .
```

**By reversibility:**
```bash
# High-reversibility decisions we can easily change
grep '"ease":"high"' decision-log.jsonl | jq .
```

### 3. Monthly Synthesis

**Every month, the team asks:**

> "How are we maintaining accountability to our decisions?"

**Generate monthly report:**

```bash
# Extract decisions from the past month
grep '"timestamp":"2025-11-' decision-log.jsonl > november-2025-decisions.jsonl

# Analyze:
# - How many decisions made?
# - Which perspectives were most/least represented?
# - Which decisions are due for revisit?
# - Which decisions were revised/reversed?
# - Are we practicing what we preach?
```

**Template for monthly synthesis:**

```markdown
# Decision Synthesis: [Month Year]

## Decisions Made: [Count]

## Perspectives Distribution:
- Technical: [%]
- Community: [%]
- Business: [%]
- Partnership: [%]
- Research: [%]
- Product: [%]

## Decisions Due for Revisit:
[List decisions with revisit_date in next 30 days]

## Relational Accountability Check:
- Are we honoring the relationships we committed to?
- Which commitments need adjustment?
- What patterns do we see in our decision-making?

## Actions for Next Month:
- [Specific changes based on patterns observed]
```

### 4. Revisiting Decisions

When a decision's `revisit_date` arrives:

1. **Review original decision:** What did we commit to?
2. **Check relational impact:** Did we honor what we said we would?
3. **Evaluate triggers:** Did any reconsideration triggers occur?
4. **Decide:** Keep, adjust, or reverse?
5. **Document:** Create new decision entry if changed, or update status to "revisited" if kept

**Example:**

```json
{
  "id": "nov20-decision-001-revisited",
  "timestamp": "2025-12-15T14:00:00Z",
  "decision": "After review, we're keeping the Tier 1 (NCP) strategy with minor adjustment: accelerating Tier 2 (IAIP) planning",
  "decision_makers": [
    {"name": "William", "role": "Strategic Lead"},
    {"name": "Jerry", "role": "Implementation Lead"}
  ],
  "perspectives_considered": {
    "technical": "NCP progressing well; we have capacity to plan IAIP in parallel",
    "community": "Community partner has become available earlier than expected",
    "business": "Anthropic expressed strong interest in IAIP during exploratory call"
  },
  "rationale": [
    "Original decision still sound",
    "New opportunities allow acceleration",
    "Not reversing, just expanding scope"
  ],
  "relational_impact": {
    "affected_parties": ["Chimera team", "Community partners", "Anthropic"],
    "how_honoring": "We're responding to community availability rather than making them wait",
    "accountability_maintained": "Monthly check-ins continue; budget allocation adjusted"
  },
  "reversibility": {
    "ease": "medium",
    "triggers": ["NCP development encounters blockers", "Budget constraints tighten"],
    "revisit_date": "2026-01-15"
  },
  "related_decisions": ["example-001"],
  "status": "decided",
  "notes": "This is an evolution of example-001, not a reversal"
}
```

---

## Integration with Other Systems

### With Ceremonial Check-Ins

**Weekly check-in includes:**
- "Did we practice what we decided this week?"
- Review decisions made this week
- Note any emerging tensions

See [Ceremonial Check-In Templates](./ceremonial-checkin-template.md)

### With Community Feedback Integration

**When community provides feedback:**
- Does it relate to an existing decision?
- Does it trigger reconsideration?
- Document the integration

See [Community Feedback Integration](./community-feedback-integration.md)

### With Relational Accountability Dashboard

**Dashboard displays:**
- Decisions made this month
- Decisions due for revisit
- Perspectives distribution (are we balanced?)
- Relational impact metrics

See [Relational Accountability Dashboard](./relational-accountability-dashboard-spec.md)

---

## Best Practices

### 1. Document Immediately
Don't wait until end of day/week. Capture decisions as they happen.

### 2. Honor Multiple Perspectives
If you're only documenting one perspective, you're probably missing something important.

### 3. Be Honest About Relational Impact
This isn't PR; it's accountability. If a decision might harm relationships, name it and plan for mitigation.

### 4. Actually Revisit
The `revisit_date` isn't optional. Put it on your calendar.

### 5. Celebrate Reversals
Changing course when you learn something new is strength, not weakness.

### 6. Make It Queryable
Use consistent tags, consistent decision_types, consistent formatting. This data is valuable.

---

## For Distributed Teams

**When working with distributed Chimera team:**

1. **Shared decision log:** Everyone commits to the same JSONL file
2. **Decision templates:** Use templates for common decision types
3. **Async decision capture:** Not everyone needs to be present for every decision, but everyone can see all decisions
4. **Perspective ownership:** Community liaison (Lian) owns "community" perspective; tech lead (Alex) owns "technical" perspective, etc.
5. **Monthly sync:** Full team reviews decision synthesis together

---

## Example Queries for Common Needs

**Show me all Strategic decisions:**
```bash
cat decision-log.jsonl | jq 'select(.decision_type=="Strategic")'
```

**Show me decisions that need revisiting soon:**
```bash
# Decisions with revisit_date in next 30 days
cat decision-log.jsonl | jq 'select(.reversibility.revisit_date | . != null and (. | split("-") | .[0:3] | join("-")) < "2025-12-31")'
```

**Show me all decisions affecting Indigenous communities:**
```bash
cat decision-log.jsonl | jq 'select(.relational_impact.affected_parties | map(. | test("Indigenous|Community"; "i")) | any)'
```

**Show me decisions with high reversibility (easy to change):**
```bash
cat decision-log.jsonl | jq 'select(.reversibility.ease=="high")'
```

**Count decisions by type:**
```bash
cat decision-log.jsonl | jq -r '.decision_type' | sort | uniq -c
```

---

## Relationship to Traditional Project Management

**Traditional PM tools (Jira, Asana, GitHub Projects) track:**
- Tasks
- Issues
- Milestones

**Decision log tracks:**
- Strategic choices
- Why we chose this path over others
- Who we're accountable to
- When we'll reconsider

**These are complementary:**
- Decision log: "We decided to build Feature X because of reasons A, B, C, affecting communities D, E, F"
- GitHub Issues: "Implement Feature X (25 subtasks)"

The decision log provides **the narrative coherence** for why the project management tasks exist.

---

## For AI Agents Working with This System

**If you're an AI agent (like me, Claude) working with this decision log:**

1. **When asked about decisions:** Query the decision log first
2. **When generating recommendations:** Reference past decisions and their rationale
3. **When planning:** Check revisit dates; bring up decisions due for reconsideration
4. **When documenting:** Help humans capture decisions in proper format
5. **When synthesizing:** Generate monthly summaries automatically

**Example agent prompt:**

> "Check the decision log for any decisions related to [topic]. If found, summarize: what was decided, why, who is affected, and when we'll revisit. If the revisit date is approaching, remind the team to schedule a review."

---

## Success Metrics for This System

**This system is working if:**

1. ✅ Every significant decision is documented within 24 hours
2. ✅ Multiple perspectives are represented in >80% of decisions
3. ✅ Revisit dates are actually honored (not ignored)
4. ✅ Team members reference decision log when planning
5. ✅ Monthly synthesis reveals patterns that inform strategy
6. ✅ Relational accountability commitments are being kept
7. ✅ Community feedback integrates with decision process

**This system is failing if:**

- Decisions are documented weeks later
- Only one perspective dominates
- Revisit dates are ignored
- Team doesn't trust the log as source of truth
- Log becomes compliance checkbox rather than living document

---

## Getting Started

### Week 1: Nov 20-27
- [ ] Make first real decisions during Nov 20 session
- [ ] Document them immediately using this system
- [ ] Validate against schema
- [ ] Schedule first revisit dates

### Week 2: Nov 27-Dec 4
- [ ] Add new decisions as they arise
- [ ] Reference decision log when planning
- [ ] Test querying for different use cases

### Week 4: Dec 11-18
- [ ] First monthly synthesis
- [ ] Present to team: "Here's what we decided, here's how we're doing"
- [ ] Adjust system based on what you learn

---

## Related Documents

- [Decision Framework Nov 20](../scaffolding/decision-framework-2025-11-20.md) - Decisions to be made
- [Ceremonial Check-In Templates](./ceremonial-checkin-template.md) - Weekly integration
- [Community Feedback Integration](./community-feedback-integration.md) - How feedback affects decisions
- [Relational Accountability Dashboard](./relational-accountability-dashboard-spec.md) - Visual display

---

**Decisions with accountability become ceremony.** 🌀

# Ceremonial Check-In Templates

**Purpose:** Regular structured reflection to ensure we're practicing what we preach.

**Principle:** Ceremony isn't just what we build; it's how we build.

---

## Weekly Team Check-In (30 minutes, every Friday)

### Opening Acknowledgment (2 minutes)

**Facilitator reads:**

> "We gather to reflect on this week's work. We acknowledge that building Ceremony Spiral means embodying ceremony ourselves. We honor the relationships we're building: with each other, with our pilot customers, with Indigenous communities, with the technology itself."

**Each person shares one word:** How are you feeling about this week's work?

---

### Part 1: Did We Practice What We Preach? (15 minutes)

**Question 1: Relational Accountability**

> "This week, did our actions honor the relationships we committed to?"

**Each team member reflects:**
- ✅ What honored relationships this week?
- ⚠️ Where did we fall short?
- 🔄 What do we need to adjust?

**Examples:**
- ✅ "We delayed a technical decision to get community input first"
- ⚠️ "We made a GitHub integration choice without considering accessibility"
- 🔄 "Next week, we'll include Ava in technical architecture discussions"

---

**Question 2: Multiple Perspectives**

> "Did we honor multiple ways of knowing in our work this week?"

**Team reflects:**
- Which perspectives were well-represented in our decisions?
- Which perspectives were missing?
- How do we bring in those missing voices next week?

**Examples:**
- ✅ "Our technical discussion included community impact considerations"
- ⚠️ "We focused heavily on technical concerns; less on user experience"
- 🔄 "Schedule a UX review session for Wednesday"

---

**Question 3: Sacred Pause**

> "Did we create space for reflection, or did we rush?"

**Team reflects:**
- Did we pause before major decisions?
- Did we celebrate successes?
- Did we learn from failures?
- Were we reactive or intentional?

**Examples:**
- ✅ "Before committing to the MCP server architecture, we paused to consider alternatives"
- ⚠️ "We rushed the pilot customer outreach; didn't think through the ask"
- 🔄 "Build in 'thinking time' before Friday meetings"

---

### Part 2: Decisions & Actions (10 minutes)

**Review decisions made this week:**
- Pull from decision log: `grep '"timestamp":"2025-11-' decision-log.jsonl | tail -7`
- For each decision: Does the team agree this is accurate?
- Any decisions we forgot to document?

**Review actions for next week:**
- What are we committing to?
- Who is responsible?
- What support do they need?

---

### Part 3: Celebration & Learning (3 minutes)

**Each person shares:**

1. **One celebration:** What went well this week that we should honor?
2. **One learning:** What did we learn that will serve us going forward?

**Examples:**
- Celebration: "Jerry's pilot customer outreach was excellent; clear and respectful"
- Learning: "We learned that Anthropic's partnership team prefers brief concept papers over long proposals"

---

### Closing Acknowledgment (1 minute)

**Facilitator reads:**

> "We've reflected together. We've named what honored relationships and what didn't. We commit to adjustment, not perfection. We continue in ceremony."

**Each person:** One word for next week's intention.

---

## Monthly Synthesis (90 minutes, last Friday of month)

### Opening: Month in Review (10 minutes)

**Facilitator shares:**
- Major milestones reached this month
- Decisions made (count from decision log)
- Relationships built or strengthened

**Team acknowledges:** What are we proud of?

---

### Part 1: Relational Accountability Audit (30 minutes)

**Question 1: Commitments Made**

Pull all decisions from this month:
```bash
grep '"timestamp":"2025-11-' decision-log.jsonl > november-decisions.jsonl
```

For each decision with `relational_impact`:
- Did we honor what we said we would?
- Who were we accountable to?
- Did we maintain that accountability?

**Create accountability report:**

```markdown
## November 2025 Relational Accountability Report

### Commitments Kept:
- [Decision ID]: We said we would [X], and we did [Y]
- [Decision ID]: We committed to [A], and we delivered [B]

### Commitments Adjusted:
- [Decision ID]: We planned [X], but learned [Y], so we adjusted to [Z]
- Rationale: [Why adjustment honored relationships better than original plan]

### Commitments We're Struggling With:
- [Decision ID]: We said [X], but we haven't yet because [Y]
- Plan: [How we'll address this in next month]
```

---

**Question 2: Community Voice**

> "Did Indigenous and community voices shape our work this month, or were they peripheral?"

**Review:**
- How many decisions included "community" perspective?
- How many times did we reach out to community partners?
- How many times did community feedback change our course?
- Is community input shaping the product, or just validating our ideas?

**Honest assessment:**
- ✅ Community voice was central to [X decisions/features]
- ⚠️ Community voice was peripheral to [Y decisions/features]
- 🔄 Next month, we will [specific changes]

---

### Part 2: Perspective Balance Analysis (20 minutes)

**Generate perspective distribution:**

```bash
# Count how many times each perspective appeared
cat november-decisions.jsonl | jq '.perspectives_considered | keys[]' | sort | uniq -c
```

**Analyze:**

| Perspective | Count | Percentage | Assessment |
|-------------|-------|------------|------------|
| Technical | 15 | 35% | ⚠️ Over-represented |
| Community | 8 | 19% | ✅ Good |
| Business | 10 | 23% | ✅ Good |
| Partnership | 6 | 14% | ⚠️ Under-represented |
| Research | 3 | 7% | ⚠️ Under-represented |
| Product | 1 | 2% | 🚨 Severely under-represented |

**Question for over-represented perspectives:**
- Why are we favoring this perspective?
- Is it appropriate for this phase, or are we avoiding other perspectives?

**Question for under-represented perspectives:**
- Why is this voice missing?
- What do we need to do to include it?
- Do we need to activate a team member earlier than planned?

**Action items:**
- [Specific changes to balance perspectives next month]

---

### Part 3: Structural Tension Assessment (20 minutes)

**Robert Fritz's framework:**
- **Current Reality:** Where are we actually, right now?
- **Desired Outcome:** Where did we say we wanted to be by end of this month?
- **Structural Tension:** What's the gap?

**For Ceremony Spiral overall:**

```markdown
## Structural Tension: November 2025

### Desired Outcome (from Nov 20 decisions):
- Charter framework agreed
- Community partnerships started
- Technical architecture drafted
- Pilot customer interested

### Current Reality:
- Charter: [Status]
- Community: [Status]
- Technical: [Status]
- Pilot: [Status]

### Gap Analysis:
- What's working to close the gap? [Reinforcing structures]
- What's preventing us from closing the gap? [Limiting structures]
- What do we need to change to create sustainable progress?
```

**Team discusses:**
- Are we trying to force progress, or are we creating structures that naturally generate progress?
- Are we operating from desired outcome, or reacting to current reality?

---

### Part 4: Ceremony as Method Check (10 minutes)

**Question:** Is Ceremony Spiral development itself ceremonial?

**Indicators we're doing it right:**
- ✅ We pause before major decisions
- ✅ We acknowledge relationships in our work
- ✅ We integrate multiple perspectives
- ✅ We create space for sacred moments (not just transactional)
- ✅ We celebrate completions properly
- ✅ We honor learning from failures

**Indicators we're slipping:**
- ⚠️ Decisions are rushed
- ⚠️ Relationships feel transactional
- ⚠️ Only one perspective dominates
- ⚠️ Work feels extractive, not reciprocal
- ⚠️ No time for reflection
- ⚠️ Failures are hidden, not learned from

**Honest assessment:** Where are we?

**Adjustments:** What do we change next month?

---

### Part 5: Next Month Planning (15 minutes)

**Commitments for next month:**

1. **Relational commitments:** Who are we accountable to next month?
2. **Perspective balance:** Which voices do we need to amplify?
3. **Ceremonial practices:** What new practices do we adopt?
4. **Decision revisits:** Which decisions come up for review next month?

**Team agrees:** These are our priorities.

---

### Closing: Gratitude & Intention (5 minutes)

**Each person shares:**

1. **Gratitude:** One person or thing you're grateful for from this month's work
2. **Intention:** One word for your intention next month

**Facilitator closes:**

> "We've reflected deeply. We've named successes and struggles. We commit to continuing in ceremony, adjusting as we learn. Onward together."

---

## Integration with Other Systems

### With Decision Log

**Weekly check-in:**
- Reviews decisions from past week
- Checks: Are they documented properly?
- Asks: Did we honor what we said?

**Monthly synthesis:**
- Analyzes all decisions from month
- Generates perspective distribution
- Creates accountability report

### With Community Feedback Integration

**Weekly:**
- Did community feedback arrive this week?
- How did we respond?
- Did it change our decisions?

**Monthly:**
- How many times did community feedback shape our work?
- Are we creating space for community voice, or just extracting input?

### With Relational Accountability Dashboard

**Dashboard displays:**
- Weekly check-in completion rate
- Monthly synthesis findings
- Trends over time (are we improving?)

---

## For Distributed Teams

**When Chimera team is distributed:**

1. **Schedule for all time zones:** Friday 4pm ET = 1pm PT = 9pm UK
2. **Async option:** Can't attend? Submit your reflections in writing
3. **Rotating facilitator:** Each week, different person facilitates
4. **Shared notes:** Document in `/decisions/check-ins/YYYY-MM-DD-weekly.md`
5. **Video recording:** Record for team members who couldn't attend

---

## Getting Started

### Week 1 (Nov 22)

**First weekly check-in:**
- Keep it short (20 minutes, not 30)
- Focus on: "Did we practice what we preach?"
- Don't worry about perfect process; just start

**Document:**
```markdown
# Weekly Check-In: Nov 22, 2025

## Attendees
- William, Jerry, [others]

## Did We Practice What We Preach?
- ✅ [What went well]
- ⚠️ [What needs work]
- 🔄 [Adjustments for next week]

## Decisions This Week
- [List from decision log]

## Celebration
- [Team celebrations]

## Next Week Intentions
- [Team commitments]
```

### Month 1 (End of November)

**First monthly synthesis:**
- Schedule 90 minutes
- Use full template
- Generate reports
- Present to stakeholders (Anthropic, community partners)

---

## Success Metrics

**This practice is working if:**

1. ✅ Team members look forward to check-ins (not dread them)
2. ✅ Check-ins reveal insights that improve our work
3. ✅ Adjustments from check-ins are actually implemented
4. ✅ Team feels accountable to each other and community
5. ✅ Practice deepens over time (not perfunctory)
6. ✅ Stakeholders (Anthropic, community) see our transparency positively

**This practice is failing if:**

- Check-ins feel like compliance checkbox
- Same issues raised every week with no change
- Team doesn't trust the space enough to be honest
- Facilitator dominates; others don't participate
- Becomes blame session instead of learning session

---

## Ceremonial Principles in Practice

These check-ins embody:

1. **Opening Acknowledgment:** We begin by acknowledging relationships
2. **Sacred Pause:** We create space for reflection, not just action
3. **Multiple Perspectives:** We explicitly ask for different voices
4. **Relational Accountability:** We name who we're accountable to
5. **Closing Commitment:** We commit to continuing, adjusted by what we learned

**This is ceremony as method.**

We're not just building a ceremonial product; we're practicing ceremony in how we build.

---

## Related Documents

- [Decision Log System](./decision-log-system.md) - Integration with decisions
- [Community Feedback Integration](./community-feedback-integration.md) - How feedback flows into check-ins
- [Relational Accountability Dashboard](./relational-accountability-dashboard-spec.md) - Visual display of check-in insights

---

**Practice creates the path.** 🌀

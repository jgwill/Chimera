# Layer 1: Relational Decision Documentation

**Purpose:** Transform technical decisions into relationally-accountable documentation.

**When to use:** After team makes a significant decision that affects relationships, technical direction, or project outcomes.

---

## The Prompt Template

```markdown
# Decision Documentation Prompt

Context: We just decided [DECISION].

Generate comprehensive decision documentation that includes:

## 1. What We Decided
Clear, concise statement of the decision made.

## 2. Why (Technical Perspective)
From a pure technical standpoint, why did we choose this path?
- What are the technical advantages?
- What technical constraints informed this?
- What alternatives did we consider technically?

## 3. How This Affects Relational Accountability
Who is affected by this decision?
- Community partners?
- Pilot customers?
- Team members?
- Indigenous stakeholders?
- Anthropic partnership?

How does this decision honor or challenge those relationships?

## 4. Multiple Perspectives That Informed This Decision

### Technical View
[What our engineers/implementers said]

### Community View
[What our Indigenous partners/community liaisons said or would say]

### Business View
[What our strategic/business leads said]

### Partnership View
[What our partnership considerations suggest]

### Research View
[What academic/research perspective brings]

### Product View
[What UX/product perspective suggests]

## 5. Perspectives We're Still Considering
What voices haven't we heard yet?
What viewpoints might we be missing?
Who should we consult before finalizing implementation?

## 6. Revisit Plan
When will we revisit this decision? (Recommend: 2-4 weeks)
What would trigger us to reconsider sooner?
How will we know if this decision is serving relationships well?

## 7. Accountability Mechanisms
How will we ensure we follow through on commitments made in this decision?
Who is responsible for what?
How will community/stakeholders provide feedback?
```

---

## Example Usage

### Input to AI System (Claude, or Jerry using Claude)

```
Decision Documentation Prompt:

Context: We just decided to lead with Tier 1 (NCP) for enterprise partnerships,
rather than Tier 2 (IAIP) or Tier 3 (Ceremony Spiral platform).

Generate comprehensive decision documentation following the Layer 1 template.

Additional context:
- Team members present: William (strategic lead), Jerry (implementation lead)
- Discussion duration: ~1 hour during Nov 20 session
- Key tension: Should we lead with most innovative (Ceremony Spiral) or most proven (NCP)?
- Resolution: Start with proven to build credibility, then scale to innovative

Please document this decision with all required perspectives and accountability mechanisms.
```

### Expected Output

```json
{
  "id": "nov20-tier1-strategy",
  "timestamp": "2025-11-20T09:30:00Z",
  "decision": "Lead with Tier 1 (NCP) to establish credibility, then scale to Tier 2 (IAIP) and Tier 3 (Ceremony Spiral)",

  "technical_rationale": "NCP is already prototyped and has been tested in multiple contexts. Starting here minimizes technical risk while we build out more complex IAIP and Ceremony Spiral components. This gives us time to properly architect the ceremonial workflows without delivery pressure.",

  "perspectives_considered": {
    "technical": "NCP has lowest technical risk; already working. We can deliver in 6-12 weeks. IAIP requires community partnerships we don't have yet. Ceremony Spiral needs full team activation.",

    "community": "Starting with NCP allows us to build trust and revenue before engaging Indigenous partnerships at scale. This honors the time needed to build proper relationships rather than rushing community engagement to meet revenue goals. However, we must ensure NCP work doesn't delay IAIP - we should plan both in parallel.",

    "business": "Fastest path to revenue. Establishes proof point with Anthropic. Creates funding for Phase 2 development. Reduces financial risk. Shows we can deliver before asking for formal partnership commitment.",

    "partnership": "Anthropic wants to see concrete value before formal partnership. Starting with NCP demonstrates our capability. Success here opens doors for IAIP and Ceremony Spiral conversations from position of proven delivery.",

    "research": "Aligns with academic publishing timeline - NCP paper can be drafted during Phase 1, published during Phase 2. IAIP paper requires community collaboration and comes later. Ceremony Spiral paper is capstone showing all systems integrated.",

    "product": "NCP gives us breathing room to properly design Ceremony Spiral UX. If we rushed to Ceremony Spiral first, we'd compromise user experience to hit timeline. This sequencing allows quality product development."
  },

  "perspectives_still_considering": "We haven't consulted community partners yet about this sequencing. We should check: Does starting with NCP feel extractive to them (like we're doing easy thing first), or does it feel respectful (like we're building capability before engaging them)? Schedule check-in with Lian's community contacts by Nov 27.",

  "relational_impact": {
    "affected_parties": [
      "Anthropic partnership team",
      "Potential pilot customers (NCP-focused enterprises)",
      "Indigenous community partners (timing of their engagement)",
      "Chimera team (workload and timeline expectations)"
    ],
    "how_honoring": "By starting with what we can deliver confidently, we build trust that enables deeper partnerships later. We're not rushing community engagement to meet business goals; we're properly sequencing to honor the time relationships need.",
    "accountability_maintained": "Monthly review of progress. If NCP doesn't generate Anthropic interest by Jan 2026, we reassess. If community partner becomes available sooner and wants to engage, we accelerate IAIP work."
  },

  "reversibility": {
    "ease": "medium",
    "triggers": [
      "Anthropic expresses no interest in NCP by Dec 2025",
      "Community partner urgently needs IAIP capabilities",
      "Pilot customer specifically requests Ceremony Spiral (not NCP)",
      "Competitive threat emerges in NCP space"
    ],
    "revisit_date": "2026-01-15"
  },

  "accountability_mechanisms": "William leads Anthropic relationship building around NCP. Jerry coordinates technical development with Samira. Monthly check-in asks: Is this sequencing still serving relationships? Are we building trust or just delaying harder conversations? Lian maintains community relationships so we're ready for IAIP when time is right."
}
```

---

## Usage Guidelines

### When to Use This Prompt

**Use for:**
- ✅ Strategic decisions affecting project direction
- ✅ Technical architecture choices with community impact
- ✅ Partnership or business model decisions
- ✅ Team structure or role changes
- ✅ Budget allocation decisions
- ✅ Timeline or milestone adjustments

**Don't use for:**
- ❌ Routine implementation details
- ❌ Individual task assignments
- ❌ Trivial choices with no relational impact
- ❌ Decisions that don't affect stakeholders beyond immediate team

### How to Use Effectively

1. **Immediately after decision:** Don't wait; capture while fresh
2. **Include dissenting views:** If someone disagreed, document their perspective
3. **Be honest about unknowns:** If we're missing perspectives, say so
4. **Set real revisit dates:** Put them on calendar, honor them
5. **Share with affected parties:** This isn't private; it's accountability documentation

### Integration with Decision Log

After generating documentation with this prompt:

1. **Validate against schema:** Does it match decision-log-schema.json?
2. **Add to decision log:** Append to ceremony-spiral/decisions/decision-log.jsonl
3. **Cross-reference:** Link related decisions
4. **Tag appropriately:** Add searchable tags

### Red Flags

**If prompt output includes these, investigate:**

- ⚠️ Only one perspective documented → Go back and consider others
- ⚠️ Relational impact is vague → Be specific about who is affected
- ⚠️ No accountability mechanisms → How will we ensure follow-through?
- ⚠️ Reversibility is "low" but no deep rationale → Are we locked in prematurely?
- ⚠️ Revisit date is >6 months out → Should we check in sooner?

---

## Advanced Usage: Multi-Agent Decision Documentation

**For distributed teams where multiple agents (AI + human) document decisions:**

```markdown
# Distributed Decision Documentation Prompt

You are an AI agent helping document a team decision.

Context:
- Decision: [DECISION]
- Decision makers: [NAMES + ROLES]
- Date: [DATE]
- Phase: [PHASE]

Your task:
1. Generate initial documentation using Layer 1 template
2. Flag any perspectives that seem missing
3. Suggest which team members should review which sections
4. Identify potential relational impacts that may not have been considered
5. Recommend appropriate revisit timeline based on decision reversibility

Output:
1. Complete decision documentation (JSON format)
2. Review checklist: "Before finalizing, ensure [X] is reviewed by [Y]"
3. Accountability setup: "Schedule [specific actions] with [specific people]"

Remember: Your goal is not perfect documentation; it's ensuring the team has
captured multiple perspectives and committed to revisiting appropriately.
```

---

## Example: Using This Prompt During Nov 20 Session

**Scenario:** Team decides on pilot customer selection strategy

**Jerry (facilitator) says:**

> "Okay, we've decided to pursue both Indigenous-led org AND enterprise customer in parallel. Let me capture this decision using Layer 1 prompt..."

**Jerry to Claude:**

```
Decision Documentation Prompt:

Context: We just decided to pursue two pilot customers in parallel:
A) Indigenous-led organization managing community projects
B) Enterprise (bank/healthcare/energy) operating in Indigenous communities

This is instead of choosing just one customer type.

Generate comprehensive decision documentation following Layer 1 template.

Additional context:
- William emphasized importance of authentic Indigenous community testimonial
- Jerry noted enterprises have larger budgets and faster procurement
- Tension: Can we serve both well, or should we focus on one?
- Resolution: Pursue both; learn from parallel approaches; one may emerge as primary

Please document with all perspectives and accountability mechanisms.
```

**Claude generates decision documentation**

**Jerry reviews, adjusts any details that don't match discussion, then:**

1. Adds to decision-log.jsonl
2. Shares with team for validation
3. Schedules revisit date (Dec 15: check which pilot is progressing better)
4. Sets up accountability: William leads Indigenous org outreach, Jerry leads enterprise outreach

**Total time:** 10 minutes to document a 30-minute decision with full relational accountability

---

## Evolution Over Time

**Month 1:** Team uses prompt explicitly; Jerry facilitates
**Month 2:** Team internalizes structure; uses prompt as checklist
**Month 3:** Team documents decisions naturally in this format; prompt is backup
**Month 6:** New team members use prompt to learn decision documentation culture

**Goal:** Prompt scaffolds the practice until it becomes natural. Then prompt becomes quality check, not mandatory step.

---

## Portfolio Value

**For Jerry:**

This prompt demonstrates his ability to:
- Scale decision-making quality across teams
- Maintain rigor without bureaucracy
- Balance efficiency with accountability
- Create reusable IP (prompt templates as product)

**For Ceremony Spiral:**

This prompt ensures:
- Decisions are documented consistently
- Multiple perspectives are honored
- Relational accountability is maintained
- Team can revisit decisions appropriately

**For Anthropic Partnership:**

This prompt shows:
- Systematic approach to responsible AI development
- Methodology that can be taught to enterprise customers
- Differentiated IP for consulting engagements
- Academic publication potential

---

## Related Documents

- [Decision Log System](../technical-infrastructure/decision-log-system.md) - Where decisions are stored
- [Ceremonial Check-In Templates](../technical-infrastructure/ceremonial-checkin-template.md) - Weekly review of decisions
- [Layer 3: Multi-Perspective Synthesis](./layer-3-multi-perspective-synthesis.md) - When perspectives conflict

---

**Documentation as ceremony, ceremony as documentation.** 🌀

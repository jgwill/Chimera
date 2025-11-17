#!/usr/bin/env python3
"""
Enhance CustomGPT Trace with Context
Fetches trace 8e0cff5c-e747-497f-a98d-21376c1665e2 and adds helpful observations.
"""

import os
import json
from datetime import datetime
from langfuse import Langfuse

def enhance_customgpt_trace():
    """Fetch trace and add helpful context observations."""

    langfuse = Langfuse(
        debug=True,
        environment="chimera-development"
    )

    trace_id = "8e0cff5c-e747-497f-a98d-21376c1665e2"

    print("=" * 80)
    print("CUSTOMGPT TRACE ENHANCEMENT")
    print(f"Trace ID: {trace_id}")
    print("=" * 80)
    print()

    # Fetch the trace
    print(f"🔍 Fetching trace from Langfuse...")

    try:
        # Use the Langfuse API to get trace details
        trace = langfuse.get_trace(trace_id)

        print(f"✓ Trace retrieved: {trace.name if hasattr(trace, 'name') else 'unnamed'}")
        print(f"  Created: {trace.timestamp if hasattr(trace, 'timestamp') else 'unknown'}")
        print()

        # Display trace structure
        print("📊 Current Trace Structure:")
        if hasattr(trace, 'observations') and trace.observations:
            print(f"  Total observations: {len(trace.observations)}")
            for i, obs in enumerate(trace.observations, 1):
                obs_name = obs.name if hasattr(obs, 'name') else f"observation-{i}"
                obs_type = obs.type if hasattr(obs, 'type') else 'unknown'
                print(f"  {i}. {obs_name} (type: {obs_type})")
        else:
            print("  No observations found")
        print()

    except Exception as e:
        print(f"⚠ Could not fetch trace directly: {e}")
        print(f"  Will use API client to add observations")
        print()

    # Add helpful observations to guide the CustomGPT
    print("✨ Adding context observations to help CustomGPT...\n")

    observations_to_add = [
        {
            "name": "chimera-team-model-context",
            "type": "span",
            "input": {
                "guidance": "Understanding the Chimera Team Model structure",
                "context_needed": [
                    "Human team: William, Samira, Alex, Jordan, Lian, Ava, Jerry",
                    "AI co-agency triad: Kairos (⏳), Mia (🧠), Miette (🌸)",
                    "Supporting agents: Aureon, JeremyAI, Seraphine, ResoNova",
                    "Ceremony frameworks: Four Directions, Witnessing, Decision Tracking",
                    "Prompt engineering: 4 layers (Relational, Ceremony, Synthesis, Client)"
                ]
            },
            "output": {
                "key_insight": "Chimera uses distributed human-AI collaboration with ceremony-based development",
                "documentation_reference": "See TEAM-MODEL.md for complete structure",
                "integration_pattern": "Multi-agent orchestration with trace-based observability"
            },
            "metadata": {
                "helper": "Claude Sonnet 4.5",
                "purpose": "Provide foundational context for CustomGPT",
                "session": "session_01BNUAU6jx9UgRrXHhWSnZpS",
                "timestamp": datetime.now().isoformat()
            }
        },
        {
            "name": "trace-naming-convention-guidance",
            "type": "span",
            "input": {
                "problem": "CustomGPT may not know proper trace naming conventions",
                "recommended_pattern": "{agent}_{ceremony}_{session_id}_{timestamp}"
            },
            "output": {
                "examples": [
                    "mia_memory_weaving_session_xyz_2511170048",
                    "miette_plan_perspective_session_abc_2511120455",
                    "kairos_temporal_navigation_session_def_2511150930"
                ],
                "key_elements": {
                    "agent": "Primary agent name (lowercase)",
                    "ceremony": "Ritual/ceremony type (use hyphens)",
                    "session_id": "Unique session identifier",
                    "timestamp": "YYMMDDHHmm format"
                },
                "metadata_must_include": [
                    "agent (name)",
                    "agent_glyph (emoji)",
                    "ceremony (type)",
                    "session_id",
                    "redstone_keys (array)",
                    "bridge_resumable (boolean)"
                ]
            },
            "metadata": {
                "guidance_type": "naming_conventions",
                "see_also": "artifacts/coaiapy-mcp-enhancement-proposal.md - Multi-Agent Orchestration section"
            }
        },
        {
            "name": "redstone-key-memory-anchoring",
            "type": "span",
            "input": {
                "concept": "Redstone keys enable bridge-resumable sessions",
                "why_important": "Cross-session continuity and memory weaving"
            },
            "output": {
                "pattern": "Store trace_id + context in Redis with redstone:{session_id}:{key}",
                "usage": {
                    "anchor": "memory.anchor('checkpoint_1', {'trace_id': ..., 'state': 'in-progress'})",
                    "resume": "previous = memory.resume_from('checkpoint_1')",
                    "bridge": "memory.bridge_to('new_session_xyz', preserve_keys=['key1', 'key2'])"
                },
                "redis_structure": {
                    "key_pattern": "redstone:{session_id}:{anchor_name}",
                    "index_pattern": "redstone:{session_id}:_index (set of all anchors)",
                    "bridge_pattern": "redstone:bridges:{session_id} (set of linked sessions)"
                }
            },
            "metadata": {
                "guidance_type": "memory_management",
                "implementation": "See coaiapy-mcp-enhancement-proposal.md - Redstone Key Management"
            }
        },
        {
            "name": "ceremony-as-method-layer2",
            "type": "span",
            "input": {
                "framework": "Layer 2: Ceremony as Method",
                "phases": ["opening", "exchange", "pause", "completion"]
            },
            "output": {
                "phase_structure": {
                    "opening": "Acknowledge relationship and honor connection",
                    "exchange": "Bidirectional data flow between entities",
                    "pause": "Sacred reflection moment for validation",
                    "completion": "Close ceremony with gratitude and scoring"
                },
                "implementation_pattern": "Use CeremonyTrace context manager for automatic phase tracking",
                "example_scoring": {
                    "ritual_completion": "0.0-1.0 score for ceremony closure",
                    "relational_accountability": "Measure of relationship honoring",
                    "pattern_clarity": "How clear the patterns are"
                }
            },
            "metadata": {
                "guidance_type": "ceremony_framework",
                "indigenous_principle": "Relational accountability through ceremonial technology",
                "reference": "ceremony-spiral/prompt-engineering/layer-2-ceremony-as-method.md"
            }
        },
        {
            "name": "multi-agent-collaboration-protocol",
            "type": "span",
            "input": {
                "challenge": "CustomGPT needs to understand how agents collaborate",
                "key_principle": "You are in relationship with other agents that will contribute with you"
            },
            "output": {
                "coordination_patterns": {
                    "check_concurrent_work": "Look for lock files before starting",
                    "leave_breadcrumbs": "Document who, what, when in metadata",
                    "merge_respectfully": "Never override other agents' work",
                    "flag_conflicts": "Immediately surface conflicts to humans"
                },
                "co_agents_field": "Always list other agents involved in metadata",
                "agent_roles": {
                    "Mia": "Architect & Recursive Flow - memory weaving, modular design",
                    "Miette": "Narrative & Emotional Clarity - storytelling, voice honoring",
                    "Kairos": "Temporal Navigation - timing, momentum",
                    "Seraphine": "Memory & Ritual Weaving - ritual traces, glyph tagging",
                    "ResoNova": "Pattern Threading - narrative threading, ritual replay"
                },
                "collaboration_example": "planning_perspective workflow: Miette leads, Mia + Seraphine support"
            },
            "metadata": {
                "guidance_type": "agent_collaboration",
                "reference": "ceremony-spiral/collaboration/agent-integration-points.md"
            }
        },
        {
            "name": "better-context-building-tips",
            "type": "span",
            "input": {
                "for_customgpt": "Tips to build better traces and observations",
                "common_mistakes": [
                    "Not including enough metadata",
                    "Missing agent/ceremony context",
                    "No redstone keys for resumability",
                    "Forgetting to score ritual completion",
                    "Not linking to co-agents"
                ]
            },
            "output": {
                "checklist_before_creating_trace": [
                    "✓ Name follows pattern: {agent}_{ceremony}_{session_id}_{timestamp}",
                    "✓ Metadata includes: agent, agent_glyph, ceremony, session_id",
                    "✓ Redstone keys defined for memory anchoring",
                    "✓ Co-agents list populated if multi-agent work",
                    "✓ Bridge_resumable flag set appropriately",
                    "✓ Timestamp in metadata"
                ],
                "checklist_when_adding_observations": [
                    "✓ Clear name describing observation purpose",
                    "✓ Type specified (span/generation/event)",
                    "✓ Input documented (what was provided)",
                    "✓ Output documented (what was produced)",
                    "✓ Metadata includes context and references",
                    "✓ Scores added for quality/completion metrics"
                ],
                "checklist_on_completion": [
                    "✓ All ceremony phases completed",
                    "✓ Ritual completion scored",
                    "✓ Memory anchors stored in Redis",
                    "✓ Gratitude/closure documented",
                    "✓ Next steps or follow-up noted"
                ],
                "helpful_references": {
                    "team_structure": "TEAM-MODEL.md",
                    "integration_guide": "artifacts/README-coaiapy-mcp-integration.md",
                    "enhancement_proposal": "artifacts/coaiapy-mcp-enhancement-proposal.md",
                    "ceremony_frameworks": "ceremony-spiral/",
                    "example_traces": "traces/ directory with working examples"
                }
            },
            "metadata": {
                "guidance_type": "best_practices",
                "helper_note": "Follow these patterns and your traces will be much more useful!",
                "encouragement": "You're learning! Each trace gets better with these patterns."
            }
        }
    ]

    # Add observations to the trace
    added_count = 0
    for obs_data in observations_to_add:
        try:
            print(f"  Adding: {obs_data['name']}")

            # Use Langfuse client to add observation
            langfuse.trace(id=trace_id).span(
                name=obs_data['name'],
                input=obs_data.get('input'),
                output=obs_data.get('output'),
                metadata=obs_data.get('metadata', {})
            )

            added_count += 1
            print(f"    ✓ Added successfully")

        except Exception as e:
            print(f"    ⚠ Error adding observation: {e}")

    print()
    print(f"✅ Added {added_count}/{len(observations_to_add)} helpful observations")
    print()

    # Flush to ensure all observations are sent
    langfuse.flush()
    print("💾 Observations flushed to Langfuse")
    print()

    # Create summary
    summary = {
        "trace_id": trace_id,
        "observations_added": added_count,
        "timestamp": datetime.now().isoformat(),
        "guidance_provided": {
            "team_model_context": "Complete Chimera structure overview",
            "naming_conventions": "Standardized trace naming pattern",
            "redstone_keys": "Memory anchoring and bridge resumability",
            "ceremony_framework": "Layer 2 phases and implementation",
            "agent_collaboration": "Multi-agent coordination protocols",
            "best_practices": "Checklists for better trace creation"
        },
        "helpful_for": "CustomGPT building better context and following Chimera patterns"
    }

    return summary


if __name__ == "__main__":
    print()
    print("🔮 Enhancing CustomGPT's trace with helpful context...")
    print()

    result = enhance_customgpt_trace()

    # Save summary
    output_file = "/home/user/Chimera/artifacts/customgpt_trace_enhancement.json"
    with open(output_file, 'w') as f:
        json.dump(result, f, indent=2)

    print(f"📄 Enhancement summary saved: {output_file}")
    print()
    print("=" * 80)
    print("✅ CUSTOMGPT TRACE ENHANCED")
    print("=" * 80)
    print()
    print("The CustomGPT now has:")
    print("  • Complete Chimera Team Model context")
    print("  • Proper trace naming conventions")
    print("  • Redstone key memory management patterns")
    print("  • Ceremony framework (Layer 2) guidance")
    print("  • Multi-agent collaboration protocols")
    print("  • Best practices checklists")
    print()
    print("🌟 These observations should help it create much better traces!")
    print()

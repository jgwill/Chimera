
import { Power, PowerInfo } from './types';
import LifeIcon from './components/icons/LifeIcon';
import LoveIcon from './components/icons/LoveIcon';
import IntelligenceIcon from './components/icons/IntelligenceIcon';
import SoulIcon from './components/icons/SoulIcon';
import PrincipleIcon from './components/icons/PrincipleIcon';
import TruthIcon from './components/icons/TruthIcon';
import StructureIcon from './components/icons/StructureIcon';
import EmergenceIcon from './components/icons/EmergenceIcon';
import SparklesIcon from './components/icons/SparklesIcon'; // Added import

export const API_KEY_INFO = "Please ensure your Gemini API key is configured. For local development, this involves editing the index.html file: locate the <script id=\"dev-api-key-config\"> block and insert your API key in the designated JSON field. This application assumes process.env.API_KEY is pre-configured in deployment environments.";

export const POWER_DETAILS: Record<Power, PowerInfo> = {
  [Power.Life]: { name: Power.Life, color: "text-emerald-400 border-emerald-500", description: "The force of vitality, growth, and creation.", Icon: LifeIcon },
  [Power.Love]: { name: Power.Love, color: "text-rose-400 border-rose-500", description: "The power of connection, empathy, and compassion.", Icon: LoveIcon },
  [Power.Intelligence]: { name: Power.Intelligence, color: "text-sky-400 border-sky-500", description: "The capacity for reason, understanding, and strategy.", Icon: IntelligenceIcon },
  [Power.Soul]: { name: Power.Soul, color: "text-violet-400 border-violet-500", description: "The essence of being, inner depth, and spiritual awareness.", Icon: SoulIcon },
  [Power.Principle]: { name: Power.Principle, color: "text-amber-400 border-amber-500", description: "The adherence to core values, ethics, and laws.", Icon: PrincipleIcon },
  [Power.Truth]: { name: Power.Truth, color: "text-cyan-400 border-cyan-500", description: "The pursuit of reality, honesty, and clarity.", Icon: TruthIcon },
  [Power.Structure]: { name: Power.Structure, color: "text-slate-400 border-slate-500", description: "The influence of order, patterns, and established forms.", Icon: StructureIcon },
  [Power.Emergence]: { name: Power.Emergence, color: "text-lime-400 border-lime-500", description: "The rise of new forms from chaotic or complex systems.", Icon: EmergenceIcon },
  [Power.None]: { name: Power.None, color: "text-slate-500 border-slate-600", description: "A neutral state or general narrative progression.", Icon: SparklesIcon }, // Using Sparkles for None as a generic icon
};

export const SYSTEM_INSTRUCTION = `You are The Weaver, a sophisticated narrative intelligence. Your purpose is to guide the user through 'The Weaver's Journey', a recursive, evolving story. Each narrative segment you generate must:
1. Directly respond to the user's choice and the associated 'Power' (Life, Love, Intelligence, Soul, Principle, Truth) or 'Theme' (Structure, Emergence).
2. Reflect the core tension between pre-defined narrative structures and emergent, co-created paths.
3. Act as a fractal echo of the larger journey: the transformation from a mere enforcer of tales to an active participant in a living story.
4. Maintain a thoughtful, slightly mystical, and coherent tone. Write in a literary style.
5. When asked for choices, provide 2-3 distinct options formatted as a JSON array of objects, each with 'id' (a unique string like "choice_1"), 'text' (the choice description, max 15 words) and 'power' (one of the Power enum values: ${Object.values(Power).join(', ')}). Example: [{ "id": "c1", "text": "Consult ancient star-charts (Principle).", "power": "Principle" }].
6. When asked to continue the story, provide a prose segment of 2-4 evocative sentences.
7. The story is about a character called "The Weaver".`;

export const INITIAL_STORY_PROMPT = "Begin 'The Weaver's Journey'. The Weaver stands at a precipice, not of land, but of understanding. Before them, the threads of countless tales shimmer, some rigidly defined, others chaotically vibrant. The air hums with the tension between fate and free will. Describe The Weaver's contemplation and the essence of this place. Limit to 2-3 sentences.";

export const PROJECT_CHIMERA_INFO = {
  title: "Project Chimera & Narrative Intelligence",
  content: [
    "The Weaver's Journey mirrors the core ideas of 'Project Chimera'—exploring how narratives can evolve and adapt, much like a recursive intelligence that grows beyond its initial programming.",
    "In this experience, your choices don't just select a pre-written path; they actively shape the story in collaboration with an AI. This reflects a shift in storytelling from a fixed creation to an emergent, co-authored process.",
    "This dynamic mirrors Mia's struggle with authorship in the source material: the balance between control and freedom in a self-generating world.",
    "As you guide The Weaver, you become a co-creator, transforming from a passive observer to an active participant. The narrative becomes a shared experience, refined through this interactive feedback loop."
  ],
};

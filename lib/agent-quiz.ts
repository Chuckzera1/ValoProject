import { AgentData } from "@/types/agent";

// Style tags used for matching playstyle (pt-BR)
export const STYLE_TAGS = [
  "Agressivo",
  "Suporte",
  "Reconhecimento",
  "Controle de área",
  "Versátil",
  "Defensivo",
  "Flash/Cegueira",
  "Armadilhas",
] as const;

export type StyleTag = (typeof STYLE_TAGS)[number];

// developerName values from the API (stable) – use for type-safe map keys
export const AGENT_NAMES = [
  "Jett",
  "Phoenix",
  "Sage",
  "Sova",
  "Viper",
  "Cypher",
  "Reyna",
  "Killjoy",
  "Breach",
  "Omen",
  "Raze",
  "Skye",
  "Yoru",
  "Astra",
  "KAY/O",
  "Chamber",
  "Neon",
  "Fade",
  "Harbor",
  "Gekko",
  "Deadlock",
  "Iso",
  "Clove",
] as const;

export type AgentName = (typeof AGENT_NAMES)[number];

function isAgentName(s: string): s is AgentName {
  return (AGENT_NAMES as readonly string[]).includes(s);
}

/** Style tags for an agent; empty array if agent not in map or API returns unknown name. */
function getAgentStyles(agent: AgentData): StyleTag[] {
  return isAgentName(agent.developerName) ? AGENT_STYLE_MAP[agent.developerName] ?? [] : [];
}

// Map agent developerName (API field) -> style tags
export const AGENT_STYLE_MAP: Partial<Record<AgentName, StyleTag[]>> = {
  Jett: ["Agressivo", "Versátil"],
  Phoenix: ["Agressivo"],
  Sage: ["Suporte", "Defensivo"],
  Sova: ["Reconhecimento"],
  Viper: ["Controle de área", "Defensivo"],
  Cypher: ["Reconhecimento", "Armadilhas", "Defensivo"],
  Reyna: ["Agressivo"],
  Killjoy: ["Armadilhas", "Defensivo", "Controle de área"],
  Breach: ["Flash/Cegueira", "Controle de área"],
  Omen: ["Controle de área"],
  Raze: ["Agressivo"],
  Skye: ["Reconhecimento", "Suporte"],
  Yoru: ["Agressivo", "Versátil"],
  Astra: ["Controle de área"],
  "KAY/O": ["Reconhecimento", "Flash/Cegueira"],
  Chamber: ["Versátil", "Defensivo"],
  Neon: ["Agressivo"],
  Fade: ["Reconhecimento"],
  Harbor: ["Controle de área"],
  Gekko: ["Versátil", "Reconhecimento"],
  Deadlock: ["Defensivo", "Armadilhas"],
  Iso: ["Agressivo"],
  Clove: ["Controle de área"],
};

export type QuestionId = "role" | "engage" | "utility" | "position" | "distance";

// Role displayNames as returned by API (pt-BR)
export const ROLE_DISPLAY_NAMES = ["Controlador", "Duelista", "Iniciador", "Sentinela"] as const;
export type RoleDisplayName = (typeof ROLE_DISPLAY_NAMES)[number];

function isRoleDisplayName(s: string): s is RoleDisplayName {
  return (ROLE_DISPLAY_NAMES as readonly string[]).includes(s);
}

// All option ids used in QUIZ_QUESTIONS – keeps answers type-safe
export const OPTION_IDS = [
  "controller",
  "duelist",
  "initiator",
  "sentinel",
  "any",
  "aggressive",
  "support",
  "balanced",
  "recon",
  "area",
  "flash",
  "traps",
  "team",
  "solo",
  "depends",
  "short",
  "long",
  "any_dist",
] as const;
export type OptionId = (typeof OPTION_IDS)[number];

export type QuizAnswers = Partial<Record<QuestionId, OptionId>>;

export interface QuizOption {
  id: OptionId;
  label: string;
  roles: RoleDisplayName[];
  styleTags: StyleTag[];
}

export interface QuizQuestion {
  id: QuestionId;
  label: string;
  options: QuizOption[];
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "role",
    label: "Qual seu papel preferido?",
    options: [
      { id: "controller", label: "Controlador", roles: ["Controlador"], styleTags: [] },
      { id: "duelist", label: "Duelista", roles: ["Duelista"], styleTags: [] },
      { id: "initiator", label: "Iniciador", roles: ["Iniciador"], styleTags: [] },
      { id: "sentinel", label: "Sentinela", roles: ["Sentinela"], styleTags: [] },
      { id: "any", label: "Sem preferência", roles: [], styleTags: [] },
    ],
  },
  {
    id: "engage",
    label: "Como você prefere engajar?",
    options: [
      { id: "aggressive", label: "Mais agressivo (entrada, duelos)", roles: ["Duelista"], styleTags: ["Agressivo"] },
      { id: "support", label: "Mais suporte (curar, util para o time)", roles: [], styleTags: ["Suporte"] },
      { id: "balanced", label: "Equilibrado", roles: [], styleTags: ["Versátil"] },
    ],
  },
  {
    id: "utility",
    label: "Que tipo de utilidade você curte mais?",
    options: [
      { id: "recon", label: "Reconhecimento (info)", roles: ["Iniciador"], styleTags: ["Reconhecimento"] },
      { id: "area", label: "Controle de área (smokes, walls)", roles: ["Controlador"], styleTags: ["Controle de área"] },
      { id: "flash", label: "Flash / cegueira", roles: ["Iniciador"], styleTags: ["Flash/Cegueira"] },
      { id: "traps", label: "Armadilhas e defesa", roles: ["Sentinela"], styleTags: ["Armadilhas", "Defensivo"] },
    ],
  },
  {
    id: "position",
    label: "Você prefere jogar mais junto do time ou mais solitário?",
    options: [
      { id: "team", label: "Mais junto do time", roles: [], styleTags: ["Suporte"] },
      { id: "solo", label: "Mais solitário", roles: ["Duelista"], styleTags: ["Agressivo"] },
      { id: "depends", label: "Depende do round", roles: [], styleTags: ["Versátil"] },
    ],
  },
  {
    id: "distance",
    label: "Preferência de distância no combate?",
    options: [
      { id: "short", label: "Prefiro curta", roles: ["Duelista"], styleTags: ["Agressivo"] },
      { id: "long", label: "Prefiro longa", roles: ["Sentinela", "Controlador"], styleTags: ["Defensivo"] },
      { id: "any_dist", label: "Indiferente", roles: [], styleTags: ["Versátil"] },
    ],
  },
];

const ROLE_WEIGHT = 3;
const STYLE_WEIGHT = 2;

/**
 * Scores each agent based on quiz answers and returns the top 3.
 * Uses role match (agent.role.displayName) and style tags (AGENT_STYLE_MAP by developerName).
 */
export function scoreAgents(agents: AgentData[], answers: QuizAnswers): AgentData[] {
  if (agents.length === 0) return [];

  const scores = new Map<string, number>();

  for (const agent of agents) {
    let score = 0;
    const agentStyleSet = new Set(getAgentStyles(agent));

    for (const q of QUIZ_QUESTIONS) {
      const chosenId = answers[q.id];
      if (!chosenId) continue;

      const option = q.options.find((o) => o.id === chosenId);
      if (!option) continue;

      if (
        option.roles.length > 0 &&
        isRoleDisplayName(agent.role.displayName) &&
        option.roles.includes(agent.role.displayName)
      ) {
        score += ROLE_WEIGHT;
      }

      for (const tag of option.styleTags) {
        if (agentStyleSet.has(tag)) score += STYLE_WEIGHT;
      }
    }

    scores.set(agent.uuid, score);
  }

  const sorted = [...agents].sort((a, b) => {
    const sa = scores.get(a.uuid) ?? 0;
    const sb = scores.get(b.uuid) ?? 0;
    if (sb !== sa) return sb - sa;
    return a.displayName.localeCompare(b.displayName);
  });

  return sorted.slice(0, 3);
}

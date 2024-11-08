import { AgentCardList } from "@/components/agent-card-list";
import { AgentData } from "@/types/agent";

export const dynamic = "force-static"; // Ensures component runs server-side only

async function fetchAgents(): Promise<AgentData[]> {
  const response = await fetch(
    "https://valorant-api.com/v1/agents?language=pt-BR&isPlayableCharacter=true",
    { next: { revalidate: 900000 } }
  );

  if (!response.ok) {
    console.error("Failed to fetch agents data.");
    return []; // Return an empty array or handle error differently
  }

  const result = await response.json();
  return result?.data ?? []; // Ensure result is an array
}

export default async function Home() {
  const agents = await fetchAgents();

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      {agents.length > 0 ? (
        <AgentCardList
          items={agents.sort((a, b) =>
            a.displayName.localeCompare(b.displayName)
          )}
        />
      ) : (
        <p className="text-center text-red-500">Failed to load agent data.</p>
      )}
    </div>
  );
}

import { AgentCardList } from "@/components/agent-card-list";
import { AgentData } from "@/types/agent";

// import SearchInput from "./components/SearchInput";

export const dynamic = "force-static"; // Ensures component runs server-side only

async function fetchAgents(): Promise<AgentData[]> {
  const apiUrl = process.env.NEXT_PUBLIC_VALO_API_URL;
  const response = await fetch(
    `${apiUrl}/agents?language=pt-BR&isPlayableCharacter=true`,
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

  
  const searchParams = new URLSearchParams("");
  const searchQuery = searchParams.get('search') || '';

  const filteredAgents = agents.filter(agent => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
      // Search by agent name
      if (agent.displayName.toLowerCase().includes(query)) return true;
      
      // Search by role/class
      if (agent.role.displayName.toLowerCase().includes(query)) return true;
      
      // Search by abilities
      const hasMatchingAbility = agent.abilities.some(ability => 
        ability.displayName.toLowerCase().includes(query) || 
        ability.description.toLowerCase().includes(query)
      );
      if (hasMatchingAbility) return true;

      return false;
    });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="heading text-center">VALORANT Agents</h1>
      
      {/* <SearchInput 
        value={searchQuery}
        onChange={(value) => {
          const params = new URLSearchParams(window.location.search);
          params.set('search', value);
          window.history.pushState({}, '', `?${params.toString()}`);
        }}
      /> */}

      {filteredAgents.length === 0 ? (
        <div className="text-center text-valorant-white/70 mt-8">
          No agents found matching &quot;{searchQuery}&quot;
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AgentCardList items={filteredAgents} />
        </div>
      )}
    </div>
  );
}

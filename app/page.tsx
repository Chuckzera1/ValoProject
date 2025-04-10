import { AgentCardList } from "@/components/agent-card-list";
import { AgentData } from "@/types/agent";
import SearchInput from "./components/SearchInput";
import { Search } from "lucide-react";

// Remove force-static and add proper dynamic configuration
export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function fetchAgents(): Promise<AgentData[]> {
  const apiUrl = process.env.NEXT_PUBLIC_VALO_API_URL;
  const response = await fetch(
    `${apiUrl}/agents?language=pt-BR&isPlayableCharacter=true`,
    { next: { revalidate: 900000 } }
  );

  if (!response.ok) {
    console.error("Failed to fetch agents data.");
    return [];
  }

  const result = await response.json();
  return result?.data ?? [];
}

export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string };
}) {
  const agents = await fetchAgents();
  const searchQuery = searchParams?.search || '';

  const filteredAgents = agents.filter(agent => {
    if (!searchQuery.trim()) return true;

    const query = searchQuery.toLowerCase();
    
    if (agent.displayName.toLowerCase().includes(query)) {
      return true;
    }
    
    if (agent.role.displayName.toLowerCase().includes(query)) {
      return true;
    }

    return false;
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="heading text-center">VALORANT Agents</h1>
      
      <SearchInput value={searchQuery} />

      {filteredAgents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="bg-valorant-black/40 border border-valorant-gray/30 rounded-full p-4 mb-4">
            <Search className="w-8 h-8 text-valorant-red/70" />
          </div>
          <h2 className="text-xl font-bold text-valorant-white mb-2">Nenhum agente encontrado</h2>
          <p className="text-valorant-white/70 max-w-md">
            Não encontramos nenhum agente correspondente a &quot;{searchQuery}&quot;. 
            Tente buscar por nome, papel ou habilidade.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AgentCardList items={filteredAgents} />
        </div>
      )}
    </div>
  );
}

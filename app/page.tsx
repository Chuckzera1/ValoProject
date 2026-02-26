import { AgentCardList } from "@/components/agent-card-list";
import { AgentData } from "@/types/agent";
import { fetchAgents } from "@/lib/agents";
import SearchInput from "./components/SearchInput";
import { Search } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
      <p className="text-center mb-6">
        <Link
          href="/descubra-seu-agente"
          className="text-valorant-red hover:text-valorant-red/90 font-medium underline underline-offset-2"
        >
          Descubra qual o seu agente →
        </Link>
      </p>

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

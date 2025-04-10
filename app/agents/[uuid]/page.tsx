import AgentDetailView from "@/components/agent-detail-view";
import { AgentData } from "@/types/agent";
import { notFound } from "next/navigation";

export const dynamic = "force-static";

async function fetchAgentDetail(uuid: string): Promise<AgentData | null> {
  const apiUrl = process.env.NEXT_PUBLIC_VALO_API_URL;
  const response = await fetch(`${apiUrl}/agents/${uuid}?language=pt-BR`, {
    next: { revalidate: 900000 },
  });

  if (!response.ok) {
    console.error("Failed to fetch agent details.");
    return null;
  }

  const result = await response.json();
  return result?.data ?? null;
}

export default async function AgentPage({
  params,
}: {
  params: { uuid: string };
}) {
  const agent = await fetchAgentDetail(params.uuid);

  if (!agent) {
    notFound();
  }

  return <AgentDetailView agent={agent} />;
} 
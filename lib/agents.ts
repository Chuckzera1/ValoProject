import { AgentData } from "@/types/agent";

export async function fetchAgents(): Promise<AgentData[]> {
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

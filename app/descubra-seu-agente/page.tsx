import { fetchAgents } from "@/lib/agents";
import { QuizDescubraAgente } from "./components/QuizDescubraAgente";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Descubra qual o seu agente | VALORANT",
  description: "Responda ao questionário e descubra os 3 agentes do Valorant que mais combinam com seu estilo de jogo.",
};

export default async function DescubraSeuAgentePage() {
  const agents = await fetchAgents();

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="heading text-center">Descubra qual o seu agente</h1>
      <p className="text-valorant-white/80 text-center mt-2 max-w-xl mx-auto">
        Responda às perguntas abaixo e recomendamos 3 agentes que combinam com seu estilo.
      </p>
      <QuizDescubraAgente agents={agents} />
    </div>
  );
}

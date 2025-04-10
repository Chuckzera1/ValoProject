import Image from "next/image";
import { CardTitle } from "./ui/card";
import { Ability } from "@/types/agent";

type AgentCardHeaderProps = {
  agentName: string;
  agentAbilities: Ability[];
  agentImage: string;
};

export function AgentCardHeader({
  agentAbilities,
  agentImage,
  agentName,
}: AgentCardHeaderProps) {
  return (
    <div className="flex flex-row gap-4 items-center">
      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-valorant-black/40">
        <Image 
          src={agentImage} 
          alt={agentName} 
          fill
          className="object-contain p-2 group-hover:scale-110 transition-transform duration-300" 
        />
      </div>
      <div className="flex flex-col gap-2 flex-1">
        <CardTitle className="text-valorant-white text-lg">{agentName}</CardTitle>
        <div className="flex flex-row gap-2">
          {agentAbilities.map((a) =>
            a.displayIcon ? (
              <div 
                key={a.slot} 
                className="relative w-8 h-8 rounded-md bg-valorant-black/40 p-1.5 group-hover:bg-valorant-black/60 transition-colors"
              >
                <Image
                  src={a.displayIcon}
                  alt={a.displayName || ""}
                  fill
                  className="object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

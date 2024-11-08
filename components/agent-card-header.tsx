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
    <div className="flex flex-row gap-2">
      <div className="h-1 w-1/2">
        <Image src={agentImage} alt={agentName} width={90} height={90} />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <CardTitle>{agentName}</CardTitle>
        <div className="flex flex-row gap-4">
          {agentAbilities.map((a) =>
            a.displayIcon ? (
              <Image
                key={a.slot}
                src={a.displayIcon}
                alt={a.displayName || ""}
                width={33}
                height={33}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

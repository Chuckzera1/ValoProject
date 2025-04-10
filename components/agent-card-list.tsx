import { AgentData } from "@/types/agent";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { AgentCardHeader } from "./agent-card-header";
import Image from "next/image";
import Link from "next/link";

type CardListProps = {
  items: AgentData[];
};

export function AgentCardList({ items }: CardListProps) {
  return (
    <>
      {items.map((i) => (
        <Link href={`/agents/${i.uuid}`} key={i.uuid} className="block">
          <Card className="group bg-valorant-black/60 border border-valorant-gray/30 hover:border-valorant-red/50 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
            <CardHeader className="p-4">
              <AgentCardHeader
                agentAbilities={i.abilities}
                agentImage={i.displayIcon}
                agentName={i.displayName}
              />
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-valorant-white/70 text-sm line-clamp-2">{i.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-4 pt-0">
              <div className="flex items-center gap-2">
                <Image 
                  src={i.role.displayIcon} 
                  alt={i.role.displayName} 
                  height={24} 
                  width={24}
                  className="opacity-80 group-hover:opacity-100 transition-opacity" 
                />
                <span className="text-valorant-white/80 text-sm">{i.role.displayName}</span>
              </div>
              <div className="text-valorant-red/80 text-sm group-hover:text-valorant-red transition-colors">
                Ver detalhes →
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </>
  );
}

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
      {items.map((i) => (
        <Link href={`/agents/${i.uuid}`} key={i.uuid}>
          <Card className="dark transition-transform hover:scale-105">
            <CardHeader>
              <AgentCardHeader
                agentAbilities={i.abilities}
                agentImage={i.displayIcon}
                agentName={i.displayName}
              />
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-center gap-4">
              <p>{i.role.displayName}</p>
              <Image src={i.role.displayIcon} alt="" height={40} width={40} />
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}

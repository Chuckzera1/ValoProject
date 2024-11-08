import { AgentData } from "@/types/agent";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { AgentCardHeader } from "./agent-card-header";
import Image from "next/image";

type CardListProps = {
  items: AgentData[];
};

export function AgentCardList({ items }: CardListProps) {
  return (
    <div className="grid grid-cols-4 gap-4 ">
      {items.map((i) => (
        <Card key={i.uuid} className="dark ">
          <CardHeader>
            <AgentCardHeader
              agentAbilities={i.abilities}
              agentImage={i.displayIcon}
              agentName={i.displayName}
            />
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-center gap-4 ">
            <p>{i.role.displayName}</p>
            <Image src={i.role.displayIcon} alt="" height={40} width={40} />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

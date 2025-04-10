import Image from 'next/image';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface Ability {
  slot: string;
  displayName: string;
  description: string;
  displayIcon: string;
}

interface AgentAbilitiesProps {
  abilities: Ability[];
}

export default function AgentAbilities({ abilities }: AgentAbilitiesProps) {
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-4 justify-center items-center p-4">
        {abilities.map((ability) => (
          <Tooltip key={ability.slot}>
            <TooltipTrigger asChild>
              <div className="ability-card group">
                <div className="relative w-16 h-16 md:w-20 md:h-20">
                  <Image
                    src={ability.displayIcon}
                    alt={ability.displayName}
                    fill
                    className="object-contain p-2 transition-transform group-hover:scale-110"
                  />
                </div>
                <span className="ability-slot">{ability.slot.toUpperCase()}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-valorant-black/95 border border-valorant-gray/30 p-3 max-w-xs">
              <h3 className="font-bold text-valorant-white mb-2">{ability.displayName}</h3>
              <p className="text-sm text-valorant-white/80">{ability.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
} 
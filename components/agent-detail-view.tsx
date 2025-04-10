'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import AgentAbilities from '@/app/components/AgentAbilities';

interface AgentDetailViewProps {
  agent: {
    displayName: string;
    fullPortrait: string;
    description: string;
    role: {
      displayName: string;
      displayIcon: string;
    };
    abilities: Array<{
      slot: string;
      displayName: string;
      description: string;
      displayIcon: string;
    }>;
  };
}

export default function AgentDetailView({ agent }: AgentDetailViewProps) {
  return (
    <div className="container mx-auto py-8 px-4">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 mb-6 group back-button"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span>Back to Agents</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative aspect-square w-full max-w-2xl mx-auto">
          <Image
            src={agent.fullPortrait}
            alt={agent.displayName}
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="space-y-6">
          <h1 className="heading">{agent.displayName}</h1>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="relative w-8 h-8">
              <Image
                src={agent.role.displayIcon}
                alt={agent.role.displayName}
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg text-valorant-white/90">{agent.role.displayName}</span>
          </div>

          <p className="text-valorant-white/80 leading-relaxed">
            {agent.description}
          </p>

          <div className="pt-6">
            <h2 className="heading">Abilities</h2>
            <AgentAbilities abilities={agent.abilities} />
          </div>
        </div>
      </div>
    </div>
  );
} 
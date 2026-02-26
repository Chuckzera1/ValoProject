"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AgentData } from "@/types/agent";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AgentCardHeader } from "@/components/agent-card-header";
import { Button } from "@/components/ui/button";
import {
  QUIZ_QUESTIONS,
  scoreAgents,
  type QuizAnswers,
} from "@/lib/agent-quiz";
import { RotateCcw } from "lucide-react";

interface QuizDescubraAgenteProps {
  agents: AgentData[];
}

export function QuizDescubraAgente({ agents }: QuizDescubraAgenteProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [finished, setFinished] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[step];
  const isFirst = step === 0;
  const isLast = step === QUIZ_QUESTIONS.length - 1;
  const selectedId = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handleSelect = (optionId: string) => {
    if (!currentQuestion) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionId }));
  };

  const handleNext = () => {
    if (isLast) {
      setFinished(true);
    } else {
      setStep((s) => s + 1);
    }
  };

  const handlePrev = () => {
    if (!isFirst) setStep((s) => s - 1);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setFinished(false);
  };

  if (finished) {
    const top3 = scoreAgents(agents, answers);

    return (
      <section className="mt-10" aria-label="Resultado do questionário">
        <h2 className="text-2xl font-bold text-valorant-white text-center mb-2">
          Seus 3 agentes recomendados
        </h2>
        <p className="text-valorant-white/70 text-center mb-8 max-w-md mx-auto">
          Estes agentes combinam mais com suas respostas. Clique para ver
          detalhes.
        </p>

        {top3.length === 0 ? (
          <p className="text-valorant-white/70 text-center">
            Responda às perguntas para ver suas recomendações.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {top3.map((agent) => (
              <Link
                href={`/agents/${agent.uuid}`}
                key={agent.uuid}
                className="block"
              >
                <Card className="group h-full bg-valorant-black/60 border border-valorant-gray/30 hover:border-valorant-red/50 transition-all duration-300 hover:scale-[1.02] overflow-hidden">
                  <CardHeader className="p-4">
                    <AgentCardHeader
                      agentAbilities={agent.abilities}
                      agentImage={agent.displayIcon}
                      agentName={agent.displayName}
                    />
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-valorant-white/70 text-sm line-clamp-2">
                      {agent.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-4 pt-0">
                    <div className="flex items-center gap-2">
                      <Image
                        src={agent.role.displayIcon}
                        alt={agent.role.displayName}
                        height={24}
                        width={24}
                        className="opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                      <span className="text-valorant-white/80 text-sm">
                        {agent.role.displayName}
                      </span>
                    </div>
                    <span className="text-valorant-red/80 text-sm group-hover:text-valorant-red transition-colors">
                      Ver detalhes →
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Button
            variant="outline"
            onClick={handleReset}
            className="border-valorant-gray/30 text-valorant-white hover:bg-valorant-red/10 hover:border-valorant-red/50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Refazer questionário
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section
      className="mt-10 max-w-xl mx-auto"
      aria-label="Questionário"
      role="form"
    >
      <div className="bg-valorant-black/60 border border-valorant-gray/30 rounded-xl p-6 sm:p-8">
        <p className="text-valorant-white/60 text-sm mb-4">
          Pergunta {step + 1} de {QUIZ_QUESTIONS.length}
        </p>
        <h2
          id={`question-${currentQuestion.id}`}
          className="text-xl font-semibold text-valorant-white mb-6"
        >
          {currentQuestion.label}
        </h2>

        <ul
          className="space-y-3"
          role="radiogroup"
          aria-labelledby={`question-${currentQuestion.id}`}
        >
          {currentQuestion.options.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                role="radio"
                aria-checked={selectedId === option.id}
                onClick={() => handleSelect(option.id)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                  selectedId === option.id
                    ? "border-valorant-red bg-valorant-red/10 text-valorant-white"
                    : "border-valorant-gray/30 text-valorant-white/90 hover:border-valorant-gray/50 hover:bg-valorant-black/40"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex justify-between mt-8 gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrev}
            disabled={isFirst}
            className="border-valorant-gray/30 text-valorant-white hover:bg-valorant-red/10 hover:border-valorant-red/50 disabled:opacity-50"
          >
            Anterior
          </Button>
          <Button
            type="button"
            onClick={handleNext}
            className="bg-valorant-red hover:bg-valorant-red/90 text-valorant-white"
          >
            {isLast ? "Ver resultado" : "Próximo"}
          </Button>
        </div>
      </div>
    </section>
  );
}

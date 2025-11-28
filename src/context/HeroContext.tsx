import React, { createContext, useContext, useMemo, useState } from "react";
import { Alert } from "react-native";

export type QuestCategory = "agua" | "movimento" | "mente" | "nutricao";

export type Quest = {
  id: string;
  title: string;
  description: string;
  xp: number;
  category: QuestCategory;
  difficulty: "Fácil" | "Média" | "Difícil";
};

type HeroContextType = {
  xp: number;
  level: number;
  league: string;
  streak: number;
  levelProgress: number;
  globalScore: number;
  quests: Quest[];
  completedQuests: string[];
  selectQuest: (quest: Quest) => void;
  completeQuest: (quest: Quest) => void;
  selectedQuest: Quest | null;
};

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export const HeroProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [xp, setXp] = useState(220);
  const [streak, setStreak] = useState(7);
  const [globalScore, setGlobalScore] = useState(50210);
  const [completedQuests, setCompletedQuests] = useState<string[]>(["q1"]);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  const level = Math.floor(xp / 100);

  const league =
    level >= 100
      ? "Lendária"
      : level >= 80
      ? "Diamante"
      : level >= 50
      ? "Ouro"
      : level >= 20
      ? "Prata"
      : "Bronze";

  const levelProgress = (xp % 100) / 100;

  const quests: Quest[] = useMemo(
    () => [
      {
        id: "q1",
        title: "Hidratação Heroica",
        description: "Beber 2 copos de água ao acordar.",
        xp: 10,
        category: "agua",
        difficulty: "Fácil",
      },
      {
        id: "q2",
        title: "Despertar em Movimento",
        description: "Caminhar 12 minutos ou subir escadas em vez do elevador.",
        xp: 20,
        category: "movimento",
        difficulty: "Média",
      },
      {
        id: "q3",
        title: "Respiração de Campeão",
        description: "Fazer 3 minutos de respiração guiada antes de começar o trabalho.",
        xp: 15,
        category: "mente",
        difficulty: "Fácil",
      },
      {
        id: "q4",
        title: "Refeição do Herói",
        description: "Registrar uma refeição com pelo menos 3 cores diferentes no prato.",
        xp: 25,
        category: "nutricao",
        difficulty: "Média",
      },
      {
        id: "q5",
        title: "Desafio da Rotina Lendária",
        description: "Cumprir 4 missões diferentes no mesmo dia.",
        xp: 40,
        category: "movimento",
        difficulty: "Difícil",
      },
    ],
    []
  );

  function selectQuest(quest: Quest) {
    setSelectedQuest(quest);
  }

  function completeQuest(quest: Quest) {
    if (completedQuests.includes(quest.id)) {
      Alert.alert("Missão já concluída", "Você já ganhou XP por essa missão hoje.");
      return;
    }

    setCompletedQuests((prev) => [...prev, quest.id]);
    setXp((prev) => prev + quest.xp);
    setGlobalScore((prev) => prev + quest.xp * 10);
    setStreak((prev) => prev + 1);

    Alert.alert(
      "Missão concluída!",
      `+${quest.xp} XP para o seu herói\n+${quest.xp * 10} pontos para o mundo`
    );
  }

  const value: HeroContextType = {
    xp,
    level,
    league,
    streak,
    levelProgress,
    globalScore,
    quests,
    completedQuests,
    selectQuest,
    completeQuest,
    selectedQuest,
  };

  return <HeroContext.Provider value={value}>{children}</HeroContext.Provider>;
};

export function useHero(): HeroContextType {
  const ctx = useContext(HeroContext);
  if (!ctx) {
    throw new Error("useHero deve ser usado dentro de um HeroProvider");
  }
  return ctx;
}

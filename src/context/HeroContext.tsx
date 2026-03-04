import React, { createContext, useContext, useMemo, useState } from "react";
import { Alert } from "react-native";

export type QuestCategory = "agua" | "movimento" | "mente" | "nutricao";
export type ActivityType = "running" | "cycling" | "swimming";

export type Quest = {
  id: string;
  title: string;
  description: string;
  km: number;
  category: QuestCategory;
  difficulty: "Fácil" | "Média" | "Difícil";
};

type HeroContextType = {
  totalMileage: number;
  runMileage: number;
  cycleMileage: number;
  swimMileage: number;
  license: string;
  streak: number;
  globalScore: number;
  quests: Quest[];
  completedQuests: string[];
  selectQuest: (quest: Quest) => void;
  completeQuest: (quest: Quest) => void;
  selectedQuest: Quest | null;
  performanceEfficiency: number; // 0 to 100
  level: number;
  league: string;
  kmProgress: number;
  nextLevelKm: number;
  currentLevelKm: number;
};

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export function HeroProvider({ children }: { children: React.ReactNode }) {
  const [runMileage, setRunMileage] = useState(12.4);
  const [cycleMileage, setCycleMileage] = useState(48.1);
  const [swimMileage, setSwimMileage] = useState(3.5);
  const [bonusMileage, setBonusMileage] = useState(0);
  const [streak, setStreak] = useState(7);
  const [globalScore, setGlobalScore] = useState(50210);
  const [completedQuests, setCompletedQuests] = useState<string[]>(["q1"]);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);

  React.useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time world activity: Randomly increase global score by 1 to 5 KM
      setGlobalScore(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const totalMileage = useMemo(() =>
    parseFloat((runMileage + cycleMileage + swimMileage + bonusMileage).toFixed(1)),
    [runMileage, cycleMileage, swimMileage, bonusMileage]);

  // Level progression based on KM -> Every 50 KM is 1 level
  const LEVEL_TIER = 50;
  const level = useMemo(() => Math.floor(totalMileage / LEVEL_TIER) + 1, [totalMileage]);
  const currentLevelKm = useMemo(() => (level - 1) * LEVEL_TIER, [level]);
  const nextLevelKm = useMemo(() => level * LEVEL_TIER, [level]);
  const kmProgress = useMemo(() => totalMileage - currentLevelKm, [totalMileage, currentLevelKm]);

  const license = useMemo(() => {
    if (totalMileage >= 500) return "S (Elite)";
    if (totalMileage >= 100) return "A (Atleta)";
    if (totalMileage >= 50) return "B (Entusiasta)";
    return "C (Amador)";
  }, [totalMileage]);

  const league = useMemo(() => {
    if (level >= 10) return "Pro League";
    if (level >= 5) return "Silver League";
    return "Bronze League";
  }, [level]);

  const performanceEfficiency = 85;

  const quests: Quest[] = useMemo(
    () => [
      {
        id: "q1",
        title: "Pit-Stop Hidratação",
        description: "Beber 2 copos de água ao acordar para manter o motor frio.",
        km: 1,
        category: "agua",
        difficulty: "Fácil",
      },
      {
        id: "q2",
        title: "Treino de Arrancada",
        description: "Corrida rápida de 2km para aquecer os pistões.",
        km: 2,
        category: "movimento",
        difficulty: "Média",
      },
      {
        id: "q3",
        title: "Calibragem Mental",
        description: "Fazer 3 minutos de respiração guiada para foco total.",
        km: 1.5,
        category: "mente",
        difficulty: "Fácil",
      },
      {
        id: "q4",
        title: "Combustível Premium",
        description: "Refeição balanceada com micronutrientes essenciais.",
        km: 2.5,
        category: "nutricao",
        difficulty: "Média",
      },
      {
        id: "q5",
        title: "Grand Prix CarePlus",
        description: "Percorrer 10km pedalando em Squad.",
        km: 10,
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
      Alert.alert("Já Sincronizado", "Check-up de segurança: manutenção já realizada hoje.");
      return;
    }

    setCompletedQuests((prev) => [...prev, quest.id]);

    if (quest.title.includes("Corrida")) setRunMileage(prev => prev + quest.km);
    else if (quest.title.includes("pedalando")) setCycleMileage(prev => prev + quest.km);
    else setBonusMileage(prev => prev + quest.km); // All non-specific movement converts to bonus KM for progression

    setGlobalScore((prev) => prev + quest.km);
    setStreak((prev) => prev + 1);

    Alert.alert(
      "Telemetria Atualizada!",
      `Métricas do sistema recalibradas: +${quest.km} KM adicionados!\nOdômetro Mundial recebeu o seu avanço.`
    );
  }

  const value: HeroContextType = {
    totalMileage,
    runMileage,
    cycleMileage,
    swimMileage,
    license,
    streak,
    globalScore,
    quests,
    completedQuests,
    selectQuest,
    completeQuest,
    selectedQuest,
    performanceEfficiency,
    level,
    league,
    kmProgress,
    nextLevelKm,
    currentLevelKm
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

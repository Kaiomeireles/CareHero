import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { useHero } from "../context/HeroContext";

const GlobalScreen: React.FC = () => {
  const { globalScore } = useHero();

  const pyramidStages = [
    "Consciência",
    "Rotina",
    "Disciplina",
    "Equilíbrio",
    "Harmonia",
    "Conexão",
    "Humanidade Saudável",
  ];

  const currentStageIndex = Math.min(
    Math.floor(globalScore / 8000),
    pyramidStages.length - 1
  );
  const currentStage = pyramidStages[currentStageIndex];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <Text style={styles.screenTitle}>Índice Global</Text>
      <Text style={styles.screenSubtitle}>
        Painel em estilo de jogo para leitura coletiva da saúde dos heróis.
      </Text>

      <View style={styles.topRow}>
        <View style={styles.globalCard}>
          <Text style={styles.cardLabel}>Pontuação atual</Text>
          <Text style={styles.globalNumber}>{globalScore.toLocaleString()} pts</Text>
          <Text style={styles.globalText}>
            No futuro, este indicador pode ser conectado à plataforma oficial da operadora, dando
            uma visão agregada de engajamento em hábitos saudáveis.
          </Text>
        </View>
        <View style={styles.illustrationCard}>
          <Image
            source={require("../assets/global-bg.png")}
            style={styles.illustration}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Pirâmide da Humanidade Saudável</Text>
        <Text style={styles.stageNow}>Estágio atual: {currentStage}</Text>

        <View style={styles.pyramid}>
          {pyramidStages.map((stage, index) => {
            const active = index <= currentStageIndex;
            return (
              <View key={stage} style={styles.pyramidRow}>
                <View
                  style={[
                    styles.pyramidBar,
                    { opacity: active ? 1 : 0.25, width: `${40 + index * 8}%` },
                  ]}
                />
                <Text style={[styles.pyramidLabel, !active && { opacity: 0.6 }]}>
                  {stage}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={styles.globalText}>
          Cada degrau representa uma etapa de maturidade: começamos em Consciência e podemos chegar
          até uma Humanidade Saudável conectada, com squads, eventos e jornadas contínuas.
        </Text>
      </View>
    </ScrollView>
  );
};

export default GlobalScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050B18",
    paddingHorizontal: 18,
    paddingTop: 12,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  screenSubtitle: {
    fontSize: 13,
    color: "#7E8AA8",
    marginBottom: 16,
  },
  topRow: {
    flexDirection: "row",
    marginBottom: 14,
  },
  globalCard: {
    flex: 2,
    backgroundColor: "#101729",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1B2440",
    marginRight: 10,
  },
  cardLabel: {
    fontSize: 11,
    color: "#7E8AA8",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  globalNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#00E28A",
    marginBottom: 6,
  },
  globalText: {
    fontSize: 13,
    color: "#9DA8C3",
  },
  illustrationCard: {
    flex: 1,
    backgroundColor: "#0B1220",
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "#141C31",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  illustration: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    borderRadius: 18,
  },
  card: {
    backgroundColor: "#0B1220",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#141C31",
    marginTop: 10,
  },
  stageNow: {
    fontSize: 14,
    color: "#00E28A",
    fontWeight: "600",
    marginBottom: 8,
  },
  pyramid: {
    marginBottom: 12,
  },
  pyramidRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  pyramidBar: {
    height: 10,
    backgroundColor: "#00E28A",
    borderRadius: 999,
    marginRight: 10,
  },
  pyramidLabel: {
    fontSize: 13,
    color: "#9DA8C3",
  },
});

import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { useHero } from "../context/HeroContext";

const HomeScreen: React.FC = () => {
  const { level, league, levelProgress, xp, streak, globalScore } = useHero();

  const progressWidth = `${Math.round(levelProgress * 100)}%`;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <Text style={styles.screenTitle}>Hall do Herói</Text>
      <Text style={styles.screenSubtitle}>
        Painel principal, inspirado em jogos, com visão do seu herói e impacto global.
      </Text>

      <View style={styles.heroCard}>
        <View style={styles.heroLeft}>
          <Image
            source={require("../assets/hero-portrait.png")}
            style={styles.heroImage}
          />
          <View style={styles.levelBadge}>
            <Text style={styles.levelLabel}>Nível</Text>
            <Text style={styles.levelValue}>{level}</Text>
          </View>
        </View>
        <View style={styles.heroRight}>
          <Text style={styles.heroName}>Herói CarePlus</Text>
          <Text style={styles.heroMeta}>
            Liga {league} • Streak {streak} dias
          </Text>
          <View style={styles.progressWrapper}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: progressWidth }]} />
            </View>
            <Text style={styles.progressText}>
              {Math.round(levelProgress * 100)}% do próximo nível • {xp} XP
            </Text>
          </View>
          <View style={styles.heroStatsRow}>
            <View style={styles.statPill}>
              <Text style={styles.statLabel}>Temporada</Text>
              <Text style={styles.statValue}>Beta 01</Text>
            </View>
            <View style={styles.statPill}>
              <Text style={styles.statLabel}>Função</Text>
              <Text style={styles.statValue}>Guardião</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.card, styles.cardHighlight]}>
          <Text style={styles.cardLabel}>Índice Global</Text>
          <Text style={styles.cardNumber}>{globalScore.toLocaleString()} pts</Text>
          <Text style={styles.cardText}>
            Pontuação combinada de todos os heróis conectados. A cada missão, o mundo sobe na
            Pirâmide da Humanidade Saudável.
          </Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.card, styles.cardHalf]}>
          <Text style={styles.cardLabel}>Hoje</Text>
          <Text style={styles.cardTitle}>Campanha ativa</Text>
          <Text style={styles.cardText}>
            Complete pelo menos 3 missões diferentes para manter o streak e destravar boosts na
            próxima temporada.
          </Text>
        </View>
        <View style={[styles.card, styles.cardHalf]}>
          <Text style={styles.cardLabel}>Próximos marcos</Text>
          <Text style={styles.cardText}>
            • Nível 20: Liga Prata{"\n"}• Nível 50: Liga Ouro{"\n"}• Nível 80: Liga Diamante{"\n"}•
            Nível 100: Liga Lendária + temporadas especiais e squads exclusivos.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

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
  heroCard: {
    flexDirection: "row",
    backgroundColor: "#101729",
    borderRadius: 28,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1B2440",
    marginBottom: 16,
  },
  heroLeft: {
    marginRight: 16,
  },
  heroImage: {
    width: 96,
    height: 96,
    borderRadius: 24,
  },
  levelBadge: {
    position: "absolute",
    bottom: -8,
    left: 8,
    backgroundColor: "#00E28A",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  levelLabel: {
    fontSize: 10,
    color: "#08251A",
    textTransform: "uppercase",
    fontWeight: "700",
  },
  levelValue: {
    fontSize: 16,
    color: "#08251A",
    fontWeight: "800",
  },
  heroRight: {
    flex: 1,
    justifyContent: "center",
  },
  heroName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  heroMeta: {
    fontSize: 12,
    color: "#9DA8C3",
    marginTop: 2,
    marginBottom: 8,
  },
  progressWrapper: {
    marginBottom: 8,
  },
  progressTrack: {
    height: 10,
    backgroundColor: "#141C31",
    borderRadius: 999,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#00E28A",
  },
  progressText: {
    fontSize: 11,
    color: "#7E8AA8",
    marginTop: 4,
  },
  heroStatsRow: {
    flexDirection: "row",
    marginTop: 4,
  },
  statPill: {
    backgroundColor: "#141C31",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  statLabel: {
    fontSize: 10,
    color: "#9DA8C3",
    textTransform: "uppercase",
  },
  statValue: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#0B1220",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#141C31",
  },
  cardHalf: {
    flex: 1,
    marginRight: 10,
  },
  cardHighlight: {
    borderColor: "#00E28A",
  },
  cardLabel: {
    fontSize: 11,
    color: "#7E8AA8",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 24,
    fontWeight: "700",
    color: "#00E28A",
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  cardText: {
    fontSize: 13,
    color: "#9DA8C3",
  },
});

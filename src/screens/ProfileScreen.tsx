import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useHero } from "../context/HeroContext";

const ProfileScreen: React.FC = () => {
  const { level, league, streak, xp } = useHero();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <Text style={styles.screenTitle}>Perfil do Herói</Text>
      <Text style={styles.screenSubtitle}>
        Tela exigida na atividade como visão de perfil / personagem, com elementos de RPG.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Status</Text>
        <View style={styles.row}>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>Nível</Text>
            <Text style={styles.statValue}>{level}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>Liga</Text>
            <Text style={styles.statValue}>{league}</Text>
          </View>
          <View style={styles.statBlock}>
            <Text style={styles.statLabel}>Streak</Text>
            <Text style={styles.statValue}>{streak} dias</Text>
          </View>
        </View>
        <Text style={styles.xpText}>{xp} XP acumulados na temporada atual.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Função do herói</Text>
        <Text style={styles.bodyText}>
          Neste protótipo, o herói está configurado como um Guardião do ecossistema Care Plus: ele
          recebe missões relacionadas a movimento, hidratação, mente e nutrição.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Slots de talentos (conceito)</Text>
        <Text style={styles.bodyText}>
          Em uma versão futura, o CareHero poderia permitir que cada pessoa equipasse talentos
          (ex.: foco em mente, foco em performance, foco em nutrição), personalizando as missões.
        </Text>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

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
  card: {
    backgroundColor: "#0B1220",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#141C31",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statBlock: {
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: "#7E8AA8",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 15,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  xpText: {
    marginTop: 10,
    fontSize: 13,
    color: "#9DA8C3",
  },
  bodyText: {
    fontSize: 13,
    color: "#9DA8C3",
  },
});

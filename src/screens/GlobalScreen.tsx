import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
  Animated
} from "react-native";
import { useHero } from "../context/HeroContext";
import { THEME } from "../constants/Theme";
import AnimatedBackground from "../components/AnimatedBackground";

const { width: windowWidth } = Dimensions.get("window");
const isWeb = Platform.OS === 'web';
const CONTENT_WIDTH = isWeb ? 450 : windowWidth;

export default function GlobalScreen() {
  const { globalScore } = useHero();

  const pyramidStages = [
    { title: "HABITE", desc: "Conscientização básica", icon: "🌱" },
    { title: "IGNITE", desc: "Início da rotina ativa", icon: "⚡" },
    { title: "DRIVE", desc: "Disciplina e constância", icon: "🏎️" },
    { title: "MINT", desc: "Equilíbrio e frescor", icon: "🌿" },
    { title: "GLOW", desc: "Harmonia corporal", icon: "✨" },
    { title: "LINK", desc: "Conexão em squads", icon: "🌐" },
    { title: "HERO", desc: "Humanidade Saudável", icon: "🏆" },
  ];

  const currentStageIndex = Math.min(
    Math.floor(globalScore / 8000),
    pyramidStages.length - 1
  );

  return (
    <View style={styles.outerContainer}>
      <AnimatedBackground />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.brandText}>CareHero</Text>
          <Text style={styles.headerSubtitle}>IMPACTO COLETIVO</Text>
        </View>

        {/* World Odometer */}
        <View style={styles.worldHOCard}>
          <Text style={styles.hoLabel}>HODÔMETRO MUNDIAL</Text>
          <Text style={styles.hoValue}>{globalScore.toLocaleString()}</Text>
          <Text style={styles.hoUnit}>KM COLETIVOS RODADOS</Text>
          <View style={styles.liveBadge}>
            <View style={styles.dot} />
            <Text style={styles.liveText}>+124 KM/MIN</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>PIRÂMIDE DA HUMANIDADE</Text>

        <View style={styles.pyramidContainer}>
          {pyramidStages.map((stage, index) => {
            const isActive = index <= currentStageIndex;
            const isCurrent = index === currentStageIndex;

            return (
              <View
                key={stage.title}
                style={[
                  styles.pyramidTier,
                  isActive && styles.activeTier,
                  isCurrent && styles.currentTier
                ]}
              >
                <View style={styles.tierLeft}>
                  <Text style={[styles.tierIcon, !isActive && { opacity: 0.3 }]}>{stage.icon}</Text>
                  <View>
                    <Text style={[styles.tierTitle, !isActive && { color: '#495576' }]}>{stage.title}</Text>
                    <Text style={[styles.tierDesc, !isActive && { color: '#273146' }]}>{stage.desc}</Text>
                  </View>
                </View>
                {isActive && (
                  <View style={styles.activeIndicator}>
                    <View style={[styles.pulseDot, isCurrent && styles.pulsing]} />
                    <Text style={styles.activeText}>{isCurrent ? 'ESTÁGIO ATUAL' : 'CONCLUÍDO'}</Text>
                  </View>
                )}
              </View>
            );
          }).reverse()}
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Cada herói conta. Sua quilometragem individual é injetada no motor da humanidade.
            Quando atingirmos o estágio <Text style={{ color: THEME.accent, fontWeight: '900' }}>HERO</Text>,
            a CarePlus liberará o maior evento de Triathlon da história.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};



const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: THEME.background,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: CONTENT_WIDTH,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    paddingTop: 50,
    marginBottom: 25,
  },
  brandText: {
    color: THEME.textMain,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -1,
  },
  headerSubtitle: {
    color: THEME.accent,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  worldHOCard: {
    backgroundColor: THEME.card,
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 30,
  },
  hoLabel: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 10,
  },
  hoValue: {
    color: THEME.textMain,
    fontSize: 48,
    fontWeight: '900',
    marginVertical: 4,
  },
  hoUnit: {
    color: THEME.textSecondary,
    fontSize: 12,
    fontWeight: '700',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(39, 122, 201, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 15,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.accent,
    marginRight: 6,
  },
  liveText: {
    color: THEME.accent,
    fontSize: 10,
    fontWeight: '900',
  },
  sectionTitle: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 15,
  },
  pyramidContainer: {
    gap: 8,
    marginBottom: 20,
  },
  pyramidTier: {
    backgroundColor: THEME.card,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeTier: {
    borderColor: THEME.border,
  },
  currentTier: {
    borderColor: THEME.accent,
    backgroundColor: 'rgba(39, 122, 201, 0.05)',
  },
  tierLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  tierIcon: {
    fontSize: 24,
  },
  tierTitle: {
    color: THEME.textMain,
    fontSize: 14,
    fontWeight: '900',
  },
  tierDesc: {
    color: THEME.textSecondary,
    fontSize: 10,
  },
  activeIndicator: {
    alignItems: 'flex-end',
  },
  activeText: {
    color: THEME.accent,
    fontSize: 8,
    fontWeight: '900',
    marginTop: 4,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.accent,
  },
  pulsing: {
    // shadow logic would go here
  },
  infoCard: {
    padding: 20,
    backgroundColor: 'rgba(39, 122, 201, 0.05)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  infoText: {
    color: THEME.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
});

import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, Platform, Image, Animated } from "react-native";
import { useHero } from "../context/HeroContext";
import { THEME } from "../constants/Theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AnimatedBackground from "../components/AnimatedBackground";

const { width: windowWidth } = Dimensions.get("window");
const isWeb = Platform.OS === 'web';
const CONTENT_WIDTH = isWeb ? 450 : windowWidth;

export default function ProfileScreen() {
  const { level, league, streak, kmProgress, nextLevelKm, currentLevelKm } = useHero();

  const progressPercent = Math.min((kmProgress / 50) * 100, 100);

  const slideAnim = useRef(new Animated.Value(30)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const barAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(barAnim, {
        toValue: progressPercent,
        duration: 1200,
        useNativeDriver: false,
      })
    ]).start();
  }, [progressPercent]);

  const barWidth = barAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  return (
    <View style={styles.outerContainer}>
      <AnimatedBackground />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: opacityAnim, transform: [{ translateY: slideAnim }] }}>
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Perfil</Text>
            <Text style={styles.headerSubtitle}>CENTRAL DE COMANDO</Text>
          </View>

          <View style={styles.profileHeader}>
            <View style={styles.avatarWrap}>
              <Image
                source={require("../assets/hero-portrait.png")}
                style={styles.avatar}
              />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.pName}>KAIOMEIRELES</Text>
              <View style={styles.tagWrap}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>PILOTO ELITE</Text>
                </View>
                <View style={[styles.tag, { backgroundColor: THEME.border }]}>
                  <Text style={[styles.tagText, { color: THEME.accent }]}>{league.toUpperCase()}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statLabel}>NÍVEL DO MOTOR</Text>
              <Text style={styles.statValue}>{level}</Text>
              <View style={styles.xpBarTrack}>
                <Animated.View style={[styles.xpBarFill, { width: barWidth as any }]} />
              </View>
              <Text style={styles.xpDetail}>{kmProgress.toFixed(1)} KM / 50 KM Para Próximo Nível</Text>
            </View>

            <View style={styles.row}>
              <View style={styles.miniStat}>
                <Text style={styles.miniLabel}>OFENSIVA</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="fire" size={20} color={THEME.danger} style={{ marginRight: 4 }} />
                  <Text style={styles.miniValue}>{streak}D</Text>
                </View>
              </View>
              <View style={styles.miniStat}>
                <Text style={styles.miniLabel}>RANKING</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="trophy" size={20} color="#FFD700" style={{ marginRight: 4 }} />
                  <Text style={styles.miniValue}>#420</Text>
                </View>
              </View>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: opacityAnim, transform: [{ translateY: slideAnim }] }}>
          <Text style={styles.sectionLabel}>ESPECIALIZAÇÕES DO PILOTO</Text>

          <View style={styles.specCard}>
            <View style={styles.specHeader}>
              <Text style={styles.specTitle}>NÚCLEO DE RESISTÊNCIA</Text>
              <Text style={styles.specActive}>ATIVO</Text>
            </View>
            <Text style={styles.specDesc}>
              Otimizado para squads de alta quilometragem e saída constante de energia.
            </Text>
          </View>

          <View style={[styles.specCard, { opacity: 0.4 }]}>
            <View style={styles.specHeader}>
              <Text style={styles.specTitle}>UNIDADE DE RECUPERAÇÃO</Text>
              <Text style={styles.specLocked}>BLOQUEADO</Text>
            </View>
            <Text style={styles.specDesc}>
              Desbloqueie no Nível 10 para melhorar a eficiência do motor em 15%.
            </Text>
          </View>
        </Animated.View>

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
  screenTitle: {
    color: THEME.textMain,
    fontSize: 28,
    fontWeight: '900',
  },
  headerSubtitle: {
    color: THEME.accent,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: THEME.accent,
    padding: 3,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 35,
  },
  profileInfo: {
    marginLeft: 20,
    flex: 1,
  },
  pName: {
    color: THEME.textMain,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -1,
  },
  tagWrap: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  tag: {
    backgroundColor: 'rgba(39, 122, 201, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    color: THEME.accent,
    fontSize: 8,
    fontWeight: '900',
  },
  statsGrid: {
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: THEME.card,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 12,
  },
  statLabel: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  statValue: {
    color: THEME.textMain,
    fontSize: 32,
    fontWeight: '900',
    marginVertical: 4,
  },
  xpBarTrack: {
    height: 4,
    backgroundColor: THEME.background,
    borderRadius: 2,
    marginVertical: 10,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: THEME.accent,
  },
  xpDetail: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  miniStat: {
    flex: 1,
    backgroundColor: THEME.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  miniLabel: {
    color: THEME.textSecondary,
    fontSize: 9,
    fontWeight: '800',
  },
  miniValue: {
    color: THEME.accent,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  sectionLabel: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 15,
  },
  specCard: {
    backgroundColor: THEME.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 12,
  },
  specHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  specTitle: {
    color: THEME.textMain,
    fontSize: 14,
    fontWeight: '900',
  },
  specActive: {
    color: THEME.accent,
    fontSize: 8,
    fontWeight: '900',
  },
  specLocked: {
    color: THEME.textSecondary,
    fontSize: 8,
    fontWeight: '900',
  },
  specDesc: {
    color: THEME.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
});

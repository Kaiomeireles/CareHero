import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  Platform,
  Animated
} from "react-native";
import { useHero } from "../context/HeroContext";
import { THEME } from "../constants/Theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AnimatedBackground from "../components/AnimatedBackground";

const { width: windowWidth } = Dimensions.get("window");
const isWeb = Platform.OS === 'web';
const CONTENT_WIDTH = isWeb ? 450 : windowWidth;

interface TelemetryProps {
  title: string;
  value: string | number;
  color: string;
  progress: number;
  unit?: string;
  val?: number;
}

function TelemetryCard({ title, value, color, progress, val }: TelemetryProps) {
  const widthAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: progress * 100,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const widthInterpolate = widthAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.tCard}>
      <Text style={[styles.tTitle, { color }]}>{title}</Text>
      <Text style={styles.tValue}>{val !== undefined ? val : value}</Text>
      <View style={styles.tBarWrap}>
        <Animated.View style={[styles.tBarFill, { backgroundColor: color, width: widthInterpolate as any }]} />
      </View>
    </View>
  );
}

const HomeScreen: React.FC = () => {
  const { totalMileage, runMileage, cycleMileage, swimMileage, license, streak, globalScore, performanceEfficiency } = useHero();

  const speedAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(0.4)).current;
  const effAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Speedometer animation
    Animated.timing(speedAnim, {
      toValue: totalMileage,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Efficiency bar animation
    Animated.timing(effAnim, {
      toValue: performanceEfficiency,
      duration: 1500,
      useNativeDriver: false,
    }).start();

    // Live dot pulsing animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, [totalMileage, performanceEfficiency]);

  const rotateInterpolate = speedAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['-120deg', '120deg'],
    extrapolate: 'clamp'
  });

  const effWidthInterpolate = effAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.outerContainer}>
      <AnimatedBackground />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.brandText}>CareHero</Text>
            <View style={styles.statusRow}>
              <Animated.View style={[styles.onlineDot, { opacity: pulseAnim }]} />
              <Text style={styles.headerSubtitle}>Hodômetro Humano v1.0</Text>
            </View>
          </View>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../assets/hero-portrait.png")}
              style={styles.avatarMini}
            />
          </View>
        </View>

        {/* Professional Odometer Section */}
        <View style={styles.odometerSection}>
          <View style={styles.gaugeOuter}>
            <View style={styles.gaugeInner}>
              <MaterialCommunityIcons name="speedometer" size={28} color={THEME.accent} style={{ marginBottom: 5 }} />
              <Text style={styles.kmLabel}>QUILOMETRAGEM</Text>
              <Text style={styles.kmValue}>{totalMileage}</Text>
              <Text style={styles.kmUnit}>KM</Text>
            </View>
            {/* Decorative Scale */}
            {[...Array(7)].map((_, i) => (
              <View
                key={i}
                style={[styles.scaleMark, { transform: [{ rotate: `${-120 + (i * 40)}deg` }] }]}
              />
            ))}
            {/* Animated Needle */}
            <Animated.View style={[styles.needleWrap, { transform: [{ rotate: rotateInterpolate }] }]}>
              <View style={styles.needle} />
            </Animated.View>
          </View>

          <View style={styles.performanceBox}>
            <View style={styles.perfHeader}>
              <Text style={styles.perfLabel}>EFICIÊNCIA DO MOTOR</Text>
              <Text style={styles.perfPercent}>{performanceEfficiency}%</Text>
            </View>
            <View style={styles.perfBarTrack}>
              <Animated.View style={[styles.perfBarFill, { width: effWidthInterpolate as any }]} />
            </View>
            <Text style={styles.perfStatus}>DESEMPENHO ESTÁVEL • TEMPERATURA IDEAL</Text>
          </View>
        </View>

        {/* Activity Telemetry Grid */}
        <View style={styles.telemetryRow}>
          <TelemetryCard title="CORRER" value={runMileage} color={THEME.accent} progress={0.4} />
          <TelemetryCard title="PEDALAR" value={cycleMileage} color={THEME.secondary} progress={0.7} />
          <TelemetryCard title="NADAR" value={swimMileage} color="#FFD700" progress={0.2} />
        </View>

        {/* License & Streak */}
        <View style={styles.statusGrid}>
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>LICENÇA CAREPLUS</Text>
            <Text style={styles.statusValue}>{license}</Text>
            <View style={styles.licenseTag}>
              <Text style={styles.licenseTagText}>PATROCÍNIO ATIVO</Text>
            </View>
          </View>
          <View style={styles.statusCard}>
            <Text style={styles.statusLabel}>OFENSIVA DIÁRIA</Text>
            <Text style={styles.statusValue}>{streak}D</Text>
            <Text style={styles.statusSub}>SISTEMAS NOMINAIS</Text>
          </View>
        </View>

        {/* Active Squad Info */}
        <View style={styles.squadActiveCard}>
          <View style={styles.saHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name="account-group" size={16} color={THEME.accent} style={{ marginRight: 6 }} />
              <Text style={styles.saTitle}>SQUAD ATUAL</Text>
            </View>
            <View style={styles.saBadge}>
              <Text style={styles.saBadgeText}>IRON HEROES</Text>
            </View>
          </View>
          <Text style={styles.saSub}>4 pilotos em sincronia térmica e telemetria compartilhada.</Text>
        </View>

        {/* Global Impact Dashboard */}
        <View style={styles.globalImpactCard}>
          <View style={styles.impactHeader}>
            <Text style={styles.impactTitle}>SINCRONIA GLOBAL</Text>
            <View style={styles.liveBadge}>
              <Animated.View style={[styles.pulseDot, { opacity: pulseAnim, transform: [{ scale: pulseAnim }] }]} />
              <Text style={styles.liveText}>AO VIVO</Text>
            </View>
          </View>
          <Text style={styles.impactValue}>{globalScore.toLocaleString()} KM</Text>
          <Text style={styles.impactSub}>Quilometragem combinada de 4.210 heróis online</Text>
        </View>

      </ScrollView>
    </View>
  );
};

export default HomeScreen;

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  brandText: {
    color: THEME.textMain,
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -1,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.accent,
    marginRight: 6,
  },
  headerSubtitle: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  avatarContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: THEME.accent,
    padding: 2,
  },
  avatarMini: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  odometerSection: {
    alignItems: 'center',
    marginBottom: 35,
  },
  gaugeOuter: {
    width: 220,
    height: 220,
    borderRadius: 110,
    borderWidth: 8,
    borderColor: THEME.card,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.background,
    position: 'relative',
  },
  gaugeInner: {
    alignItems: 'center',
  },
  kmLabel: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  kmValue: {
    color: THEME.textMain,
    fontSize: 56,
    fontWeight: '900',
    marginVertical: -5,
  },
  kmUnit: {
    color: THEME.accent,
    fontSize: 14,
    fontWeight: '900',
  },
  scaleMark: {
    position: 'absolute',
    width: 2,
    height: 10,
    backgroundColor: THEME.border,
    top: 5,
    left: 109,
    transformOrigin: 'center 105px',
  },
  needleWrap: {
    position: 'absolute',
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  needle: {
    position: 'absolute',
    width: 4,
    height: 90,
    backgroundColor: THEME.danger,
    top: 15,
    borderRadius: 2,
  },
  performanceBox: {
    width: '100%',
    marginTop: 30,
    backgroundColor: THEME.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  perfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  perfLabel: {
    color: THEME.textSecondary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  perfPercent: {
    color: THEME.accent,
    fontSize: 11,
    fontWeight: '900',
  },
  perfBarTrack: {
    height: 6,
    backgroundColor: THEME.background,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  perfBarFill: {
    height: '100%',
    backgroundColor: THEME.accent,
  },
  perfStatus: {
    color: THEME.textSecondary,
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  telemetryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tCard: {
    backgroundColor: THEME.card,
    width: (CONTENT_WIDTH - 55) / 3,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  tTitle: {
    fontSize: 9,
    fontWeight: '900',
    marginBottom: 4,
  },
  tValue: {
    color: THEME.textMain,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 8,
  },
  tBarWrap: {
    height: 3,
    backgroundColor: THEME.background,
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  tBarFill: {
    height: '100%',
  },
  statusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statusCard: {
    backgroundColor: THEME.card,
    width: (CONTENT_WIDTH - 50) / 2,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  statusLabel: {
    color: THEME.textSecondary,
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 1,
  },
  statusValue: {
    color: THEME.textMain,
    fontSize: 24,
    fontWeight: '900',
    marginVertical: 4,
  },
  statusSub: {
    color: THEME.accent,
    fontSize: 9,
    fontWeight: '700',
  },
  licenseTag: {
    backgroundColor: 'rgba(39, 122, 201, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  licenseTagText: {
    color: THEME.accent,
    fontSize: 8,
    fontWeight: '900',
  },
  globalImpactCard: {
    backgroundColor: THEME.card,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  impactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  impactTitle: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(39, 122, 201, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.accent,
    marginRight: 6,
  },
  liveText: {
    color: THEME.accent,
    fontSize: 9,
    fontWeight: '900',
  },
  impactValue: {
    color: THEME.textMain,
    fontSize: 32,
    fontWeight: '900',
  },
  impactSub: {
    color: THEME.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },
  squadActiveCard: {
    backgroundColor: THEME.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.accent,
    marginBottom: 20,
  },
  saHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  saTitle: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
  },
  saBadge: {
    backgroundColor: THEME.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  saBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: '900',
  },
  saSub: {
    color: THEME.textMain,
    fontSize: 11,
    fontWeight: '700',
  },
});

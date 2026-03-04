import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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

export default function QuestsScreen() {
  const { quests, completedQuests, completeQuest } = useHero();

  const progressAnim = useRef(new Animated.Value(0)).current;
  const listAnim = useRef(quests.map(() => new Animated.Value(0))).current;

  const progressPercent = (completedQuests.length / quests.length) * 100;

  useEffect(() => {
    // ProgressBar Animation
    Animated.timing(progressAnim, {
      toValue: progressPercent,
      duration: 1200,
      useNativeDriver: false, // width doesn't support native driver
    }).start();

    // Cascading List Animation
    Animated.stagger(150, listAnim.map(anim =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      })
    )).start();
  }, [progressPercent]);

  const progressInterpolate = progressAnim.interpolate({
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
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Pit-Stop</Text>
          <Text style={styles.headerSubtitle}>MANUTENÇÃO DIÁRIA</Text>
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>STATUS DE RECUPERAÇÃO</Text>
            <Text style={styles.progressValue}>
              {Math.round(progressPercent)}%
            </Text>
          </View>
          <View style={styles.track}>
            <Animated.View
              style={[styles.fill, { width: progressInterpolate as any }]}
            />
          </View>
        </View>

        <Text style={styles.sectionLabel}>SERVIÇOS PENDENTES</Text>

        {quests.map((quest, index) => {
          const isDone = completedQuests.includes(quest.id);

          const slideUp = listAnim[index].interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0]
          });

          return (
            <Animated.View
              key={quest.id}
              style={[
                styles.qCard,
                isDone && styles.qCardDone,
                { opacity: listAnim[index], transform: [{ translateY: slideUp }] }
              ]}
            >
              <View style={styles.qHeader}>
                <View style={[styles.badge, { backgroundColor: getCategoryColor(quest.category) }]}>
                  <Text style={styles.badgeText}>{quest.category.toUpperCase()}</Text>
                </View>
                {quest.km && (
                  <Text style={styles.kmReward}>+{quest.km} KM</Text>
                )}
              </View>

              <Text style={styles.qTitle}>{quest.title}</Text>
              <Text style={styles.qDesc}>{quest.description}</Text>

              <View style={styles.qFooter}>
                <Text style={styles.difficultyText}>{quest.difficulty.toUpperCase()}</Text>
                <TouchableOpacity
                  style={[styles.btn, isDone && styles.btnDone]}
                  onPress={() => completeQuest(quest)}
                  activeOpacity={0.7}
                >
                  {isDone ? (
                    <MaterialCommunityIcons name="check-decagram" size={16} color={THEME.textSecondary} />
                  ) : (
                    <Text style={styles.btnText}>INICIAR</Text>
                  )}
                </TouchableOpacity>
              </View>
            </Animated.View>
          );
        })}
      </ScrollView>
    </View>
  );
};

function getCategoryColor(cat: string) {
  switch (cat) {
    case 'agua': return "rgba(0, 191, 255, 0.15)";
    case 'movimento': return "rgba(39, 122, 201, 0.15)";
    case 'mente': return "rgba(168, 85, 247, 0.15)";
    case 'nutricao': return "rgba(255, 215, 0, 0.15)";
    default: return "rgba(126, 138, 168, 0.15)";
  }
}



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
  progressCard: {
    backgroundColor: THEME.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 30,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  progressValue: {
    color: THEME.accent,
    fontSize: 20,
    fontWeight: '900',
  },
  track: {
    height: 6,
    backgroundColor: THEME.background,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: THEME.accent,
  },
  sectionLabel: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 15,
  },
  qCard: {
    backgroundColor: THEME.card,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 15,
  },
  qCardDone: {
    opacity: 0.6,
  },
  qHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: THEME.textMain,
    fontSize: 8,
    fontWeight: '900',
  },
  kmReward: {
    color: THEME.accent,
    fontSize: 12,
    fontWeight: '900',
  },
  qTitle: {
    color: THEME.textMain,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
  },
  qDesc: {
    color: THEME.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 18,
  },
  qFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: 15,
  },
  difficultyText: {
    color: THEME.textSecondary,
    fontSize: 9,
    fontWeight: '800',
  },
  btn: {
    backgroundColor: THEME.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  btnDone: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: THEME.border,
  },
  btnText: {
    color: THEME.textMain,
    fontSize: 11,
    fontWeight: '900',
  },
  btnTextDone: {
    color: THEME.textSecondary,
  },
});

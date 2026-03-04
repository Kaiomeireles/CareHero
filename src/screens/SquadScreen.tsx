import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  Animated,
  Alert
} from "react-native";
import { THEME } from "../constants/Theme";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AnimatedBackground from "../components/AnimatedBackground";

const { width: windowWidth } = Dimensions.get("window");
const isWeb = Platform.OS === 'web';
const CONTENT_WIDTH = isWeb ? 450 : windowWidth;

export default function SquadScreen() {
  const [activeTab, setActiveTab] = useState("SQUADS");

  const squadMembers = [
    { id: '1', name: 'Lucas P.', activity: '29.0 KM', speed: '25.4 KM/h', avatar: 'https://i.pravatar.cc/150?u=1' },
    { id: '2', name: 'Sarah J.', activity: '18.1 KM', speed: '12.1 KM/h', avatar: 'https://i.pravatar.cc/150?u=2' },
    { id: '3', name: 'Mike L.', activity: '22.5 KM', speed: '14.8 KM/h', avatar: 'https://i.pravatar.cc/150?u=3' },
    { id: '4', name: 'Elena P.', activity: '11.6 KM', speed: '10.3 KM/h', avatar: 'https://i.pravatar.cc/150?u=4' },
  ];

  const handleJoin = (name: string) => {
    Alert.alert("Sincronizando...", `Conectando seu hodômetro ao squad "${name}".`);
  };

  return (
    <View style={styles.outerContainer}>
      <AnimatedBackground />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.screenTitle}>Arena de Squads</Text>
          <Text style={styles.headerSubtitle}>COMPETIÇÃO AO VIVO</Text>
        </View>

        <View style={styles.lobbyCard}>
          <View style={styles.lobbyHeader}>
            <Text style={styles.lobbyTitle}>SALA DE TELEMETRIA</Text>
            <View style={styles.liveBadge}>
              <View style={styles.dot} />
              <Text style={styles.liveText}>4 ONLINE</Text>
            </View>
          </View>

          <View style={styles.grid}>
            {squadMembers.map((m) => (
              <View key={m.id} style={styles.member}>
                <View style={[styles.avatarWrap, m.id === '1' && { borderColor: THEME.accent }]}>
                  <Image source={{ uri: m.avatar }} style={styles.avatar} />
                </View>
                <Text style={styles.mName} numberOfLines={1}>{m.name}</Text>
                <Text style={styles.mValue}>{m.activity}</Text>
                <Text style={styles.mSpeed}>{m.speed}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionLabel}>GRAND PRIX ATIVO</Text>

        <TouchableOpacity
          style={styles.eventCard}
          onPress={() => handleJoin("Triathlon CarePlus")}
          activeOpacity={0.9}
        >
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1530549387634-e747807b99c3?auto=format&fit=crop&w=800&q=80' }}
            style={styles.eventImg}
          />
          <View style={styles.eventOverlay}>
            <View style={styles.sponsor}>
              <Text style={styles.sponsorText}>PATROCÍNIO CAREPLUS</Text>
            </View>
            <Text style={styles.eventTitle}>IRON HERO TRIATHLON</Text>
            <Text style={styles.eventTags}>540 INSCRITOS • APENAS SQUADS</Text>
            <View style={styles.btnRow}>
              <View style={styles.eventBtn}>
                <Text style={styles.eventBtnText}>ENTRAR NA CORRIDA</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity style={styles.miniCard} onPress={() => handleJoin("Duo Rush")}>
            <Text style={styles.miniLabel}>DUO RUSH</Text>
            <Text style={styles.miniTitle}>Sincronize GPS com um parceiro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.miniCard} onPress={() => handleJoin("Clubes Elite")}>
            <Text style={styles.miniLabel}>CLUBES ELITE</Text>
            <Text style={styles.miniTitle}>Rankings corporativos</Text>
          </TouchableOpacity>
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
  lobbyCard: {
    backgroundColor: THEME.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.border,
    marginBottom: 30,
  },
  lobbyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  lobbyTitle: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(39, 122, 201, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
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
    fontSize: 9,
    fontWeight: '900',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  member: {
    alignItems: 'center',
    width: (CONTENT_WIDTH - 100) / 4,
  },
  avatarWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: THEME.accent,
    padding: 2,
    marginBottom: 8,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 22,
  },
  mName: {
    color: THEME.textMain,
    fontSize: 10,
    fontWeight: '800',
  },
  mValue: {
    color: THEME.textSecondary,
    fontSize: 9,
    marginTop: 2,
  },
  mSpeed: {
    color: THEME.accent,
    fontSize: 9,
    fontWeight: '700',
  },
  sectionLabel: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 15,
  },
  eventCard: {
    height: 220,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  eventImg: {
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
  eventOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  sponsor: {
    backgroundColor: THEME.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  sponsorText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: '900',
  },
  eventTitle: {
    color: THEME.textMain,
    fontSize: 22,
    fontWeight: '900',
  },
  eventTags: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
  btnRow: {
    marginTop: 15,
  },
  eventBtn: {
    backgroundColor: THEME.accent,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  eventBtnText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '900',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  miniCard: {
    width: (CONTENT_WIDTH - 50) / 2,
    backgroundColor: THEME.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: THEME.border,
  },
  miniLabel: {
    color: THEME.secondary,
    fontSize: 9,
    fontWeight: '800',
    marginBottom: 6,
  },
  miniTitle: {
    color: THEME.textMain,
    fontSize: 14,
    fontWeight: '800',
  },
});

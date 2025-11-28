import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from "react-native";

const SquadScreen: React.FC = () => {
  function handleJoin(name: string) {
    Alert.alert(
      "Squad conectado",
      `Você entrou no squad "${name}". No produto real, esse fluxo sincronizaria regras e participantes com o evento da vida real.`
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <Text style={styles.screenTitle}>Squads & Eventos</Text>
      <Text style={styles.screenSubtitle}>
        Tela tipo lobby de jogo, conectando eventos físicos (como triathlons) com o app.
      </Text>

      <View style={styles.bannerCard}>
        <Image
          source={require("../assets/squad-banner.png")}
          style={styles.bannerImage}
        />
        <View style={styles.bannerOverlay}>
          <Text style={styles.bannerTitle}>Triathlon CareHero</Text>
          <Text style={styles.bannerText}>
            Squad infinito conectado a um evento patrocinado. Heróis completam, no app, missões
            inspiradas nas etapas da prova.
          </Text>
          <TouchableOpacity
            style={styles.bannerButton}
            onPress={() => handleJoin("Triathlon CareHero")}
          >
            <Text style={styles.bannerButtonText}>Entrar no squad do evento</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.card, styles.halfCard]}>
          <Text style={styles.cardTitle}>Corrida matinal em duo</Text>
          <Text style={styles.cardText}>
            Dois heróis sincronizam uma rotina matinal de movimento, hidratação e mente. Pensado
            para casais, amigos ou familiares.
          </Text>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => handleJoin("Corrida matinal em duo")}
          >
            <Text style={styles.secondaryButtonText}>Simular corrida a dois</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.card, styles.halfCard]}>
          <Text style={styles.cardTitle}>Clãs temáticos</Text>
          <Text style={styles.cardText}>
            Empresas, famílias, grupos de amigos. Cada clã teria seu próprio painel de impacto
            global, sempre com foco em cooperação.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SquadScreen;

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
  bannerCard: {
    borderRadius: 26,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#1B2440",
  },
  bannerImage: {
    width: "100%",
    height: 180,
  },
  bannerOverlay: {
    padding: 14,
    backgroundColor: "#050B18",
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  bannerText: {
    fontSize: 13,
    color: "#9DA8C3",
    marginBottom: 8,
  },
  bannerButton: {
    backgroundColor: "#00E28A",
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
  },
  bannerButtonText: {
    color: "#050B18",
    fontWeight: "700",
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  card: {
    flex: 1,
    backgroundColor: "#0B1220",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#141C31",
    marginBottom: 14,
  },
  halfCard: {
    flex: 1,
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
  secondaryButton: {
    marginTop: 10,
    borderRadius: 999,
    paddingVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00E28A",
  },
  secondaryButtonText: {
    color: "#00E28A",
    fontWeight: "700",
    fontSize: 13,
  },
});

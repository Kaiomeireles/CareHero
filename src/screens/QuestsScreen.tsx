import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useHero } from "../context/HeroContext";

const QuestsScreen: React.FC = () => {
  const { quests, completedQuests, selectQuest, completeQuest } = useHero();
  const [mood, setMood] = React.useState("neutro");

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      <Text style={styles.screenTitle}>Missões</Text>
      <Text style={styles.screenSubtitle}>
        Tela inspirada em passe de batalha: missões diárias e desafios especiais.
      </Text>

      <View style={styles.moodCard}>
        <Text style={styles.moodLabel}>Como você está hoje?</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={mood}
            onValueChange={(itemValue) => setMood(itemValue)}
            style={styles.picker}
            dropdownIconColor="#FFFFFF"
          >
            <Picker.Item label="Neutro" value="neutro" />
            <Picker.Item label="Animado(a)" value="animado" />
            <Picker.Item label="Cansado(a)" value="cansado" />
            <Picker.Item label="Estressado(a)" value="estressado" />
            <Picker.Item label="Grato(a)" value="grato" />
          </Picker>
        </View>
        <Text style={styles.moodHint}>
          Este humor poderá ser usado, no produto real, para personalizar quais missões aparecem
          primeiro.
        </Text>
      </View>

      {quests.map((quest) => {
        const done = completedQuests.includes(quest.id);
        return (
          <TouchableOpacity
            key={quest.id}
            activeOpacity={0.85}
            onPress={() => selectQuest(quest)}
          >
            <View style={[styles.questCard, done && styles.questCardDone]}>
              <View style={styles.questLeft}>
                <View style={styles.questTag}>
                  <Text style={styles.questTagText}>{quest.difficulty}</Text>
                </View>
                <Text style={styles.questTitle}>{quest.title}</Text>
                <Text style={styles.questDescription}>{quest.description}</Text>
                <View style={styles.questMetaRow}>
                  <Text style={styles.questCategory}>{categoryLabels[quest.category]}</Text>
                  <Text style={styles.questXp}>+{quest.xp} XP</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.button, done && styles.buttonDone]}
                onPress={() => completeQuest(quest)}
              >
                <Text style={styles.buttonText}>
                  {done ? "Concluída" : "Concluir"}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default QuestsScreen;

const categoryLabels: Record<string, string> = {
  agua: "Água",
  movimento: "Movimento",
  mente: "Mente",
  nutricao: "Nutrição",
};

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
  moodCard: {
    backgroundColor: "#101729",
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: "#1B2440",
    marginBottom: 14,
  },
  moodLabel: {
    fontSize: 13,
    color: "#9DA8C3",
    marginBottom: 6,
  },
  pickerContainer: {
    backgroundColor: "#050B18",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#141C31",
  },
  picker: {
    height: 44,
    color: "#FFFFFF",
  },
  moodHint: {
    fontSize: 11,
    color: "#7E8AA8",
    marginTop: 8,
  },
  questCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0B1220",
    borderRadius: 22,
    padding: 14,
    borderWidth: 1,
    borderColor: "#141C31",
    marginBottom: 10,
  },
  questCardDone: {
    borderColor: "#1B3A2F",
    backgroundColor: "#07141A",
  },
  questLeft: {
    flex: 1,
    marginRight: 10,
  },
  questTag: {
    alignSelf: "flex-start",
    backgroundColor: "#16213A",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 4,
  },
  questTagText: {
    fontSize: 10,
    color: "#E5F4FF",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  questTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  questDescription: {
    fontSize: 13,
    color: "#9DA8C3",
    marginTop: 2,
  },
  questMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 6,
  },
  questCategory: {
    fontSize: 12,
    color: "#7E8AA8",
  },
  questXp: {
    fontSize: 13,
    color: "#00E28A",
    fontWeight: "600",
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#00E28A",
  },
  buttonDone: {
    backgroundColor: "#273146",
  },
  buttonText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#050B18",
  },
});

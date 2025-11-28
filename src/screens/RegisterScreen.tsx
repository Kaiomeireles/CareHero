import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../App";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("Novo Herói");
  const [email, setEmail] = useState("novo.hero@careplus.com");

  function handleRegister() {
    // Aqui entraria o fluxo de criação de conta real.
    navigation.replace("MainTabs");
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Criar conta CareHero</Text>
        <Text style={styles.subtitle}>
          Para fins de protótipo, esta tela demonstra o fluxo de cadastro exigido na atividade.
        </Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome"
            placeholderTextColor="#7E8AA8"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="voce@careplus.com"
            placeholderTextColor="#7E8AA8"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            placeholderTextColor="#7E8AA8"
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Criar e acessar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>Já tenho conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#050B18",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 13,
    color: "#9DA8C3",
    marginTop: 6,
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#0B1220",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#141C31",
  },
  label: {
    fontSize: 13,
    color: "#9DA8C3",
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#050B18",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#141C31",
    fontSize: 14,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#00E28A",
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#050B18",
    fontSize: 15,
    fontWeight: "700",
  },
  backText: {
    marginTop: 12,
    fontSize: 13,
    color: "#9DA8C3",
    textAlign: "center",
  },
});

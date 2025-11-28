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

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("hero@careplus.com");
  const [password, setPassword] = useState("123456");

  function handleLogin() {
    navigation.replace("MainTabs");
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.logo}>CareHero</Text>
        <Text style={styles.subtitle}>
          Transformando saúde em experiência de jogo dentro do ecossistema Care Plus.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Entrar</Text>
          <Text style={styles.cardHint}>
            Protótipo de demonstração — usuário já preenchido.
          </Text>

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="hero@careplus.com"
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
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Acessar Hall do Herói</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.secondaryButtonText}>Criar conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#050B18",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: "center",
  },
  logo: {
    fontSize: 40,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "left",
  },
  subtitle: {
    fontSize: 14,
    color: "#9DA8C3",
    marginTop: 8,
    marginBottom: 24,
    maxWidth: 320,
  },
  card: {
    backgroundColor: "#0B1220",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#141C31",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  cardHint: {
    fontSize: 12,
    color: "#7E8AA8",
    marginTop: 4,
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: "#9DA8C3",
    marginTop: 12,
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
  secondaryButton: {
    marginTop: 12,
    borderRadius: 999,
    paddingVertical: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3B4A70",
  },
  secondaryButtonText: {
    color: "#9DA8C3",
    fontSize: 13,
    fontWeight: "600",
  },
});

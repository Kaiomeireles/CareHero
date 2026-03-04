import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform
} from "react-native";
import { THEME } from "../constants/Theme";

const { width: windowWidth } = Dimensions.get("window");
const isWeb = Platform.OS === 'web';
const CONTENT_WIDTH = isWeb ? 450 : windowWidth;

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    navigation.replace("MainTabs");
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>← VOLTAR PARA LOGIN</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.brandText}>CareHero</Text>
          <Text style={styles.title}>RECRUTAMENTO</Text>
          <View style={styles.statusLine}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>AGUARDANDO DADOS</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>NOME DO PILOTO</Text>
            <TextInput
              style={styles.input}
              placeholder="SEU NOME"
              placeholderTextColor="#495576"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-MAIL DO PILOTO</Text>
            <TextInput
              style={styles.input}
              placeholder="piloto@carehero.com.br"
              placeholderTextColor="#495576"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CÓDIGO DE ACESSO</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#495576"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleRegister}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>INICIAR LICENÇA</Text>
          </TouchableOpacity>

          <Text style={styles.policy}>
            Ao se alistar, você concorda com os protocolos de alto desempenho da CareHero e o compartilhamento de dados de telemetria.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: THEME.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: CONTENT_WIDTH,
    paddingHorizontal: 40,
  },
  backBtn: {
    position: 'absolute',
    top: -40,
    left: 40,
    zIndex: 10,
  },
  backText: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  brandText: {
    color: THEME.accent,
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  title: {
    color: THEME.textMain,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 4,
    marginTop: 10,
  },
  statusLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: 'rgba(39, 122, 201, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.accent,
    marginRight: 8,
  },
  statusText: {
    color: THEME.accent,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  input: {
    backgroundColor: THEME.card,
    borderRadius: 16,
    padding: 16,
    color: THEME.textMain,
    fontSize: 15,
    fontWeight: '600',
    borderWidth: 1,
    borderColor: THEME.border,
  },
  loginButton: {
    backgroundColor: THEME.accent,
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: THEME.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 2,
  },
  policy: {
    color: THEME.textSecondary,
    fontSize: 9,
    textAlign: 'center',
    marginTop: 25,
    lineHeight: 14,
    opacity: 0.6,
  },
});

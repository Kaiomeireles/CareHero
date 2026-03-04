import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Platform,
  Animated
} from "react-native";
import { THEME } from "../constants/Theme";
import AnimatedBackground from "../components/AnimatedBackground";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: windowWidth } = Dimensions.get("window");
const isWeb = Platform.OS === 'web';
const CONTENT_WIDTH = isWeb ? 450 : windowWidth;

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const splashAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.delay(1000),
      Animated.timing(splashAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      })
    ]).start(() => setShowSplash(false));
  }, []);

  const handleLogin = () => {
    if (email && password) {
      Alert.alert("Motor Ligado", "Sistemas nominais. Pronto para a largada!");
      navigation.navigate("MainTabs");
    } else {
      Alert.alert("Falha na Partida", "Verifique suas credenciais e tente novamente.");
    }
  };

  return (
    <View style={styles.outerContainer}>
      <AnimatedBackground />
      {showSplash && (
        <Animated.View style={[styles.splashOverlay, { opacity: splashAnim }]}>
          <Animated.View style={{ alignItems: 'center', transform: [{ scale: scaleAnim }] }}>
            <MaterialCommunityIcons name="heart-pulse" size={100} color={THEME.accent} />
            <Text style={styles.splashBrand}>CareHero</Text>
            <Text style={styles.splashSub}>INICIANDO TELEMETRIA...</Text>
          </Animated.View>
        </Animated.View>
      )}

      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.brandText}>CareHero</Text>
          <Text style={styles.title}>INICIAR MOTOR</Text>
          <View style={styles.statusLine}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>SISTEMAS PRONTOS</Text>
          </View>
        </View>

        <View style={styles.form}>
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
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>IGNIÇÃO</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.registerText}>
              NÃO TEM LICENÇA? <Text style={styles.registerHighlight}>RECRUTAR NOVO PILOTO</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>v1.0.42-STABLE</Text>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

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
  header: {
    alignItems: 'center',
    marginBottom: 50,
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
    marginBottom: 25,
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
    padding: 18,
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
    marginTop: 20,
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
  registerLink: {
    marginTop: 30,
    alignItems: 'center',
  },
  registerText: {
    color: THEME.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  registerHighlight: {
    color: THEME.accent,
    fontWeight: '900',
  },
  footer: {
    marginTop: 80,
    alignItems: 'center',
  },
  versionText: {
    color: '#1B2440',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  splashOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: THEME.background,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashBrand: {
    color: THEME.accent,
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -2,
    marginTop: 20,
  },
  splashSub: {
    color: THEME.textSecondary,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 4,
    marginTop: 15,
  },
});

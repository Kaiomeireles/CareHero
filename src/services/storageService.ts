import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_SESSION_KEY = '@CareHero:userSession';

export interface UserSession {
  email: string;
  isLoggedIn: boolean;
}

export const StorageService = {
  async saveUserSession(session: UserSession): Promise<void> {
    try {
      const jsonValue = JSON.stringify(session);
      await AsyncStorage.setItem(USER_SESSION_KEY, jsonValue);
    } catch (e) {
      console.error('Erro ao salvar sessão no AsyncStorage', e);
    }
  },

  async getUserSession(): Promise<UserSession | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(USER_SESSION_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Erro ao ler sessão do AsyncStorage', e);
      return null;
    }
  },

  async clearUserSession(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_SESSION_KEY);
    } catch (e) {
      console.error('Erro ao limpar sessão do AsyncStorage', e);
    }
  }
};

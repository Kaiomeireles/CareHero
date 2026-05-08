import * as SecureStore from 'expo-secure-store';

/**
 * Utilitário de segurança para armazenar credenciais sensíveis (Tokens, Senhas).
 * Utiliza o armazenamento criptografado nativo do dispositivo (Keychain no iOS, Keystore no Android)
 * em vez de armazenar em texto plano no AsyncStorage.
 */
export async function salvarSegredo(chave: string, valor: string): Promise<void> {
  try {
    await SecureStore.setItemAsync(chave, valor);
    console.log(`[Segurança] Segredo '${chave}' salvo com sucesso no cofre criptografado.`);
  } catch (error) {
    console.error(`[Segurança] Erro ao salvar o segredo '${chave}':`, error);
  }
}

export async function lerSegredo(chave: string): Promise<string | null> {
  try {
    const valor = await SecureStore.getItemAsync(chave);
    if (valor) {
        console.log(`[Segurança] Segredo '${chave}' recuperado do cofre.`);
    } else {
        console.log(`[Segurança] Segredo '${chave}' não encontrado.`);
    }
    return valor;
  } catch (error) {
    console.error(`[Segurança] Erro ao ler o segredo '${chave}':`, error);
    return null;
  }
}

export async function deletarSegredo(chave: string): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(chave);
    console.log(`[Segurança] Segredo '${chave}' removido do cofre.`);
  } catch (error) {
    console.error(`[Segurança] Erro ao deletar o segredo '${chave}':`, error);
  }
}

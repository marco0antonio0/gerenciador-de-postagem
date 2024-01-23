import { parseCookies, setCookie } from "nookies";

export default class TokenManager {
  static TOKEN_KEY = "auth-token"; // Substitua 'meuToken' pelo nome desejado para a chave do cookie

  static setToken(token: string) {
    setCookie(null, TokenManager.TOKEN_KEY, token, {
      maxAge: 30 * 24 * 60 * 60, // Expira em 30 dias, ajuste conforme necessário
      path: "/",
    });
  }

  static getToken() {
    const cookies = parseCookies();
    return cookies[TokenManager.TOKEN_KEY];
  }
}

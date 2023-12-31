import axios from "axios";
import { sha256 } from "js-sha256";

const API_URL = "http://localhost:3009";
axios.defaults.withCredentials = true;

class AuthService {
  sha256sum = (string: string) => {
    const cleanLogin = this.cleanLogin(string);
    return sha256(cleanLogin);
  };

  login(login: string, password: string) {
    return axios
      .post(`${API_URL}/users/sign_in.json`, {
        user: {
          login,
          password: this.sha256sum(password),
        },
      })
      .then((response) => {
        // console.warn(
        //   `🚀 > file: AuthService.tsx:23 > AuthService > .then > response:`,
        //   response,
        // );
        return response.data;
      });
  }

  async register(login: string, password: string) {
    this.cleanLogin(login);
    const response = await axios.post(`${API_URL}/users.json`, {
      user: {
        username: login,
        email: `${login}${login}@epitech.eu`,
        password: this.sha256sum(password),
        password_confirm: this.sha256sum(password),
      },
    });
    // console.warn(
    //   `🚀 > file: AuthService.tsx:40 > AuthService > .then > response:`,
    //   response,
    // );
    return response.data;
  }

  async getCurrentUser() {
    let result = null;

    try {
      const response = await axios.get(`${API_URL}/users/current_user`);
      result = response.data;
    } catch (error) {
      console.error("Error fetching the current user :", error);
    }

    return result;
  }

  cleanLogin(input: string) {
    let result = input.toLowerCase();
    result = result.replace(/\s+/g, "");
    result = result.replace(/[^a-zA-Z0-9]/g, "");
    return result;
  }
}

export default new AuthService();

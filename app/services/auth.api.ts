import api from "./api";
import {
  LoginRequest,
  LoginResponse,
} from "../../types/login";

class AuthAPI {
  async login(
    data: LoginRequest
  ): Promise<LoginResponse> {
    const response = await api.post(
      "/api/auth/login",
      data
    );

    return response.data;
  }
}

export default new AuthAPI();
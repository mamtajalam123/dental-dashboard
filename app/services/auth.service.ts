import AuthAPI from "./auth.api";
import { LoginRequest, LoginResponse } from "@/types/login";

class AuthService {
  async login(
    data: LoginRequest
  ): Promise<LoginResponse> {
    return await AuthAPI.login(data);
  }
}

export default new AuthService();
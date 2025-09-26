import { LoginDTO } from "../../../DTO/user.dto";

export interface ILoginUseCase {
  execute(loginDTO: LoginDTO): Promise<{ accessToken: string; refreshToken: string }>;
}

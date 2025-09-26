import bcrypt from "bcryptjs";
import { IHashingService } from "../../application/interface/services/IHashing.service";
import { envConfig } from "../../shared/configs/env";
import { injectable } from "inversify";

@injectable()
class HashingService implements IHashingService {
  public async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, envConfig.PASSWORD_SALT_ROUNDS);
  }

  public async compare(storedHash: string, password: string): Promise<boolean> {
    return await bcrypt.compare(password, storedHash);
  }
}

export default HashingService;

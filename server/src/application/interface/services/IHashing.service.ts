export interface IHashingService {
  hash(data: string): Promise<string>;
  compare(storedHash: string, data: string): Promise<boolean>;
}

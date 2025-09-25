export interface IRefreshUseCase {
  execute(userId: string): Promise<{ accessToken: string; refreshToken: string }>;
}

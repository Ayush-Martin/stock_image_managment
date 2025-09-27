export interface IDeleteImageUseCase {
  execute(id: string): Promise<void>;
}

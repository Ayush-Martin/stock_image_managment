class ImageEntity {
  constructor(
    public readonly userId: string,
    public readonly id: string,
    public readonly url: string,
    public readonly title: string,
    public readonly order: number,
  ) {}
}

export default ImageEntity;

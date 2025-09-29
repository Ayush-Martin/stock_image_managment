import z from "zod";

export type UploadImageDTO = {
  images: {
    title: string;
    url: string;
  }[];
};

export type EditImageDTO = {
  url: string;
};

export const EditImageTitleSchema = z.object({
  title: z.string(),
});

export type EditImageTitleDTO = z.infer<typeof EditImageTitleSchema>;

export const RearrangeImagesSchema = z.object({
  images: z.array(
    z.object({
      id: z.string(),
      order: z.number(),
      url: z.string().optional(),
      title: z.string().optional(),
    }),
  ),
});

export type RearrangeImagesDTO = z.infer<typeof RearrangeImagesSchema>;

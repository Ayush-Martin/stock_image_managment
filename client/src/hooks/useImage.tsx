import {
  axiosDeleteRequest,
  axiosGetRequest,
  axiosPutRequest,
  axiosPostRequest,
  axiosPatchRequest,
} from "@/config/axios";
import { IMAGES_API } from "@/constants/API";
import { useState } from "react";

interface IImage {
  id: string;
  url: string;
  title: string;
  order: number;
}

const useImage = () => {
  const [images, setImages] = useState<Array<IImage>>([]);

  const fetchImages = async () => {
    const res = await axiosGetRequest(IMAGES_API);
    if (!res) return;
    setImages(res.data);
  };

  const deleteImage = async (id: string) => {
    const res = await axiosDeleteRequest(`${IMAGES_API}/${id}`);
    if (!res) return;
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const updateImage = async (
    id: string,
    file: File,
    meta?: { title?: string; order?: number }
  ) => {
    const formData = new FormData();
    formData.append("image", file);
    if (meta?.title) formData.append("title", meta.title);
    if (meta?.order !== undefined) formData.append("order", String(meta.order));

    const res = await axiosPatchRequest(`${IMAGES_API}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (!res) return;

    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, ...res.data } : img))
    );
  };

  const updateImageTitle = async (id: string, title: string) => {
    const res = await axiosPatchRequest(`${IMAGES_API}/${id}/title`, { title });
    if (!res) return;
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, title } : img))
    );
  };

  const rearrangeImages = async (images: Array<IImage>) => {
    setImages(images);
    const res = await axiosPutRequest(IMAGES_API, { images });
    if (!res) return;
  };

  const uploadImages = async (files: File[], meta?: { title?: string }) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    if (meta?.title) formData.append("title", meta.title);

    const res = await axiosPostRequest(IMAGES_API, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (!res) return;
    setImages((prev) => [...prev, ...res.data]);
  };

  return {
    images,
    fetchImages,
    deleteImage,
    updateImage,
    updateImageTitle,
    uploadImages,
    rearrangeImages,
  };
};

export default useImage;

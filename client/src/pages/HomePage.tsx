// App.tsx
import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, Key, LogOut } from "lucide-react";
import useImage from "@/hooks/useImage";
import Image from "@/components/Image";
import ImageModal from "@/components/ImageModal";

type ImageItem = {
  id: string;
  url: string;
  title: string;
  order: number;
};

const HomePage: React.FC = () => {
  const {
    images,
    fetchImages,
    deleteImage,
    updateImageTitle,
    uploadImages,
    rearrangeImages,
    updateImage,
  } = useImage();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((img) => img.id === active.id);
    const newIndex = images.findIndex((img) => img.id === over.id);

    const reordered = arrayMove(images, oldIndex, newIndex).map((img, idx) => ({
      ...img,
      order: idx,
    }));

    await rearrangeImages(reordered);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    await uploadImages(files);
  };

  const handleDelete = async (id: string) => {
    await deleteImage(id);
  };

  const sortedImages = [...images].sort((a, b) => a.order - b.order);

  return (
    <div className="min-h-screen text-gray-100 flex flex-col">
      {/* Header */}
      <header className="w-full h-16 sticky top-0 z-50 bg-gray-900/60 backdrop-blur-md border-b border-gray-800 flex flex-wrap justify-between items-center px-4 sm:px-6 md:px-8">
        {/* Logo / Title */}
        <h1 className="text-xl font-bold text-white flex-1 min-w-[150px]">
          Stock Image Management
        </h1>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Add Images */}
          <label className="flex items-center gap-2 bg-blue-700/80 hover:bg-blue-800/80 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all cursor-pointer backdrop-blur-sm">
            <Plus size={16} />
            <span className="hidden sm:inline">Add Images</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </label>

          {/* Change Password */}
          <button className="flex items-center gap-2 bg-gray-800/70 hover:bg-gray-700/70 text-gray-200 px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all backdrop-blur-sm">
            <Key size={16} />
            <span className="hidden sm:inline">Change Password</span>
          </button>

          {/* Logout */}
          <button className="flex items-center gap-2 bg-red-600/80 hover:bg-red-700/80 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all backdrop-blur-sm">
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Gallery */}
      <main className="flex-1 mt-6 px-2 sm:px-6 md:px-8 lg:px-16">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedImages.map((img) => img.id)}
            strategy={rectSortingStrategy}
          >
            <div className="grid gap-4 sm:gap-5 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 auto-rows-fr">
              {sortedImages.map((img) => (
                <Image
                  key={img.id}
                  image={img}
                  onDelete={handleDelete}
                  selectImage={setSelectedImage}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </main>

      {/* Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          updateImage={updateImage}
          updateTitle={updateImageTitle}
        />
      )}
    </div>
  );
};

export default HomePage;

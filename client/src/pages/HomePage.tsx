import React, { useState, ChangeEvent } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X, Upload } from "lucide-react";

// ---- TYPES ----
interface ImageItemType {
  id: string;
  src: string;
  title: string;
}

// ---- SORTABLE ITEM COMPONENT ----
interface SortableItemProps extends ImageItemType {
  onTitleChange: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({
  id,
  src,
  title,
  onTitleChange,
  onDelete,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden relative group hover:scale-105 hover:shadow-xl transition-transform duration-200 ${
        isDragging ? "opacity-50 z-50" : ""
      }`}
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 left-2 bg-black bg-opacity-50 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab active:cursor-grabbing z-10"
      >
        <GripVertical size={16} />
      </div>

      {/* Delete Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
      >
        <X size={16} />
      </button>

      {/* Image */}
      <img
        src={src}
        alt={title || "Gallery image"}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src =
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y3ZjdmNyIvPgogIDx0ZXh0IHg9IjEwMCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5JbWFnZSBub3QgZm91bmQ8L3RleHQ+Cjwvc3ZnPg==";
        }}
      />

      {/* Title Input */}
      <div className="p-3 flex flex-col gap-2">
        <input
          type="text"
          placeholder="Enter image title..."
          value={title}
          onChange={(e) => onTitleChange(id, e.target.value)}
          className="w-full bg-gray-50 border border-gray-300 rounded-md px-2 py-1 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

// ---- GALLERY COMPONENT ----
interface GalleryProps {
  images: ImageItemType[];
  setImages: React.Dispatch<React.SetStateAction<ImageItemType[]>>;
  sensors: ReturnType<typeof useSensors>;
}

const Gallery: React.FC<GalleryProps> = ({ images, setImages, sensors }) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex((img) => img.id === active.id);
      const newIndex = images.findIndex((img) => img.id === over.id);
      setImages((prev) => arrayMove(prev, oldIndex, newIndex));
    }
  };

  const handleTitleChange = (id: string, title: string) => {
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, title } : img))
    );
  };

  const handleDelete = (id: string) => {
    // Revoke object URL to avoid memory leaks
    const img = images.find((img) => img.id === id);
    if (img && img.src.startsWith("blob:")) {
      URL.revokeObjectURL(img.src);
    }

    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  if (images.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg">
        <div className="text-center text-gray-500">
          <Upload size={48} className="mx-auto mb-4 text-gray-400" />
          <p className="text-lg font-medium">No images uploaded yet</p>
          <p className="text-sm">Upload some images to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={images.map((img) => img.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((img) => (
            <SortableItem
              key={img.id}
              id={img.id}
              src={img.src}
              title={img.title}
              onTitleChange={handleTitleChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

// ---- MAIN PAGE COMPONENT ----
const HomePage: React.FC = () => {
  const [images, setImages] = useState<ImageItemType[]>([]);

  // Initialize sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before activating drag
      },
    })
  );

  const handleFiles = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      alert("Please select valid image files.");
      return;
    }

    const newImages: ImageItemType[] = imageFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      src: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
    }));

    setImages((prev) => [...prev, ...newImages]);
    e.target.value = ""; // Reset input
  };

  const clearAllImages = () => {
    // Clean up object URLs
    images.forEach((img) => {
      if (img.src.startsWith("blob:")) {
        URL.revokeObjectURL(img.src);
      }
    });
    setImages([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-blue-600 text-center">
          My Image Gallery
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center justify-center">
          <label className="cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFiles}
              className="hidden"
            />
            <span className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200">
              <Upload size={20} />
              Upload Images
            </span>
          </label>

          {images.length > 0 && (
            <button
              onClick={clearAllImages}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
            >
              <X size={20} />
              Clear All
            </button>
          )}
        </div>

        <div className="mb-4 text-center text-gray-600">
          {images.length > 0 && (
            <p className="text-sm">
              {images.length} image{images.length !== 1 ? "s" : ""} uploaded.
              Drag the grip handle to reorder images.
            </p>
          )}
        </div>

        <Gallery images={images} setImages={setImages} sensors={sensors} />
      </div>
    </div>
  );
};

export default HomePage;

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FC } from "react";
import { Pencil, X } from "lucide-react";

type ImageItem = {
  id: string;
  url: string;
  title: string;
  order: number;
};

interface IImageProps {
  image: ImageItem;
  onDelete: (id: string) => void;
  selectImage: (image: ImageItem) => void;
}

const Image: FC<IImageProps> = ({ image, onDelete, selectImage }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleEdit = () => selectImage(image);

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-full sm:w-48 sm:h-48 aspect-square rounded-2xl overflow-hidden shadow-md cursor-grab group border border-app-info bg-app-bg-secondary p-3"
    >
      <img
        src={image.url}
        alt={image.title}
        className="w-full h-full object-cover"
      />

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
        <div className="flex justify-end gap-1">
          <button
            onClick={() => onDelete(image.id)}
            className="bg-black/60 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
        <div className="flex justify-between items-end">
          <p className="text-white text-sm font-medium truncate max-w-[70%]">
            {image.title}
          </p>
          <button
            onClick={handleEdit}
            className="bg-black/60 text-white p-1 rounded-md hover:bg-blue-600 transition-colors flex items-center"
          >
            <Pencil size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Image;

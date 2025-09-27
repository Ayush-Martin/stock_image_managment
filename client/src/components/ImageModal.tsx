import { FC, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Upload } from "lucide-react";

type ImageItem = {
  id: string;
  url: string;
  title: string;
  order: number;
};

interface IImageModalProps {
  image: ImageItem;
  onClose: () => void;
  updateTitle: (id: string, title: string) => void;
  updateImage: (id: string, image: File) => void;
}

const ImageModal: FC<IImageModalProps> = ({
  image,
  onClose,
  updateImage,
  updateTitle,
}) => {
  const [title, setTitle] = useState(image.title);

  useEffect(() => {
    setTitle(image.title);
  }, [image]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateImage(image.id, e.target.files[0]);
    }
  };

  const handleSave = () => {
    if (title.trim() !== "") {
      updateTitle(image.id, title.trim());
    }
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6">
      <div className="bg-app-bg-secondary border-app-info p-6 rounded-2xl w-full max-w-lg shadow-2xl relative flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-semibold text-white text-center mt-4 mb-6">
          Edit Image
        </h2>

        {/* Image Preview */}
        <div className="w-full h-64 sm:h-80 rounded-lg overflow-hidden mb-4 border border-gray-700">
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="Enter new title"
        />

        {/* Change Image Button */}
        <label className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg cursor-pointer mb-6 border border-gray-700 transition">
          <Upload size={16} />
          <span className="text-sm">Change Image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mb-4">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
};

export default ImageModal;

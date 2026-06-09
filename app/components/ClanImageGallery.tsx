"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type ClanImage = {
  id: number;
  imageUrl: string;
  altText: string | null;
  isPrimary: boolean;
  uploadedAt: string;
};

export default function ClanImageGallery({ clanId }: { clanId: number }) {
  const [images, setImages] = useState<ClanImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ClanImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, [clanId]);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/clans/${clanId}/images`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setImages(data);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const altText = prompt("Enter image description (e.g., 'Zulu clan shield symbol'):", "") || "";

    const formData = new FormData();
    formData.append("image", file);
    formData.append("altText", altText);

    setUploading(true);
    try {
      const res = await fetch(`/api/clans/${clanId}/images`, {
        method: "POST",
        body: formData,
      });
      
      if (res.ok) {
        await fetchImages();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to upload image");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    try {
      const res = await fetch(`/api/clans/${clanId}/images?imageId=${imageId}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        await fetchImages();
      } else {
        alert("Failed to delete image");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete image");
    }
  };

  const handleSetPrimary = async (imageId: number) => {
    try {
      const res = await fetch(`/api/clans/${clanId}https://res.cloudinary.com/dwxp1yq4b/image/upload/v1779383915/${imageId}/primary`, {
        method: "PUT",
      });
      
      if (res.ok) {
        await fetchImages();
      }
    } catch (error) {
      console.error("Error setting primary:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#C2633B]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-[#2C1810]">Clan Images</h3>
        <label className="cursor-pointer bg-[#C2633B] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#A84E2C] transition">
          {uploading ? "Uploading..." : "+ Add Image"}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={handleImageUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
          <span className="text-4xl mb-2 block">📸</span>
          <p className="text-sm">No images yet. Add the first image for this clan!</p>
          <p className="text-xs text-gray-400 mt-1">JPEG, PNG, WebP, or GIF (Max 5MB)</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          {images.map((image) => (
            <div key={image.id} className="relative group">
              <div
                className="relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.altText || "Clan image"}
                  fill
                  className="object-cover hover:scale-105 transition duration-300"
                />
              </div>
              
              {image.isPrimary && (
                <span className="absolute top-1 right-1 bg-[#D4A017] text-white text-xs px-1.5 py-0.5 rounded-full">
                  ⭐ Primary
                </span>
              )}
              
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                {!image.isPrimary && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSetPrimary(image.id);
                    }}
                    className="bg-[#D4A017] text-white p-1.5 rounded-full hover:bg-[#B89012] transition text-xs"
                    title="Set as primary"
                  >
                    ⭐
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteImage(image.id);
                  }}
                  className="bg-red-600 text-white p-1.5 rounded-full hover:bg-red-700 transition text-xs"
                  title="Delete image"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <div className="relative aspect-video">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.altText || "Clan image"}
                fill
                className="object-contain"
              />
            </div>
            {selectedImage.altText && (
              <p className="text-white text-center mt-4">{selectedImage.altText}</p>
            )}
            <button
              className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
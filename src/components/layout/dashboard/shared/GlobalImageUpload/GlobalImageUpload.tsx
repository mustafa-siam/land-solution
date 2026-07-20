/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, ChangeEvent, Key } from "react";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import imageCompression from "browser-image-compression";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface GlobalImageUploadProps {
  setMetaData: (value: any) => void;
  methods: any;
  metaData: Record<string, any>;
  valueKey: string;
  multiple?: boolean;
  maxFiles?: number;
  maxFileSizeMB?: number;
}

export default function GlobalImageUpload({
  setMetaData,
  methods,
  metaData,
  valueKey,
  multiple = true,
  maxFiles,
  maxFileSizeMB = 5,
}: GlobalImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const imageData = metaData?.[valueKey] || { url: [], file: [] };
  const files = imageData.file || [];
  const urls = imageData.url || [];

  const previewMap = useRef<Map<File, string>>(new Map());
  const createPreview = (file: File) => {
    if (!previewMap.current.has(file)) {
      previewMap.current.set(file, URL.createObjectURL(file));
    }
    return previewMap.current.get(file)!;
  };

  const updateImageData = (newData: { url: string[]; file: File[] }) => {
    setMetaData((prev: any) => ({ ...prev, [valueKey]: newData }));
    methods.setValue(valueKey, newData, { shouldValidate: true, shouldDirty: true });
  };

  const compressFile = async (file: File) => {
    if (file.size / 1024 / 1024 < 1) return file;
    return await imageCompression(file, {
      maxSizeMB: maxFileSizeMB,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    });
  };

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (!selected.length) return;

    const invalidFiles = selected.filter(
      (f) => !f.type.startsWith("image/") || f.size / 1024 / 1024 > maxFileSizeMB
    );
    if (invalidFiles.length) {
      toast.error(`Some files are invalid or exceed ${maxFileSizeMB}MB.`);
      e.target.value = "";
      return;
    }

    const compressedFiles = await Promise.all(selected.map(compressFile));

    if (maxFiles && compressedFiles.length + files.length + urls.length > maxFiles) {
      toast.error(`You can upload up to ${maxFiles} image${maxFiles > 1 ? "s" : ""}.`);
      e.target.value = "";
      return;
    }

    updateImageData({ url: urls, file: [...files, ...compressedFiles] });
    e.target.value = "";
  };

  const handleRemoveOld = (idx: Key | null | undefined) => {
    const newUrls = urls.filter((_: any, i: number) => i !== idx);
    updateImageData({ url: newUrls, file: files });
  };

  const handleRemoveNew = (idx: Key | null | undefined) => {
    const newFiles = files.filter((_: any, i: number) => i !== idx);
    updateImageData({ url: urls, file: newFiles });
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div className="space-y-4">
      {/* Upload box */}
      <div
        onClick={triggerFileInput}
        onDragOver={(e) => e.preventDefault()}
        className="relative cursor-pointer border-2 border-dashed border-gray-300 p-6 text-center hover:border-blue-500 hover:bg-blue-50 dark:border-gray-700 dark:hover:bg-gray-700 dark:bg-gray-800"
      >
        <input
          type="file"
          multiple={multiple}
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileSelect}
        />
        <div className="flex flex-col items-center gap-1 text-gray-600 dark:text-gray-200">
          <ImagePlus className="w-8 h-8" />
          <p className="text-sm font-medium">Click or drag & drop to upload</p>
        </div>
      </div>

      {maxFiles && (
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          You can upload up to {maxFiles} image{maxFiles > 1 ? "s" : ""}.{" "}
          {maxFiles - (urls.length + files.length)} remaining.
        </p>
      )}

      {/* Old Images */}
      {urls.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Existing Images</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {urls.map((url: string | StaticImport, idx: React.Key | null | undefined) => (
              <div key={idx} className="relative group border rounded-md overflow-hidden">
                <Image src={url} alt={`old-${idx}`} width={300} height={300} className="w-full h-24 object-cover" />
                <p
                  onClick={() => handleRemoveOld(idx)}
                  className="absolute top-0 right-0 bg-black/60 text-white text-xs p-1 opacity-0 group-hover:opacity-100 hover:bg-red-600 cursor-pointer"
                >
                  <X size={14} />
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Images */}
      {files.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">New Uploads</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {files.map((file: File, idx: React.Key | null | undefined) => {
              const src = previewMap.current.get(file) ?? createPreview(file);
              return (
                <div key={idx} className="relative group border rounded-md overflow-hidden">
                  <Image src={src} alt={`new-${idx}`} width={300} height={300} className="w-full h-24 object-cover" />
                  <button
                    onClick={() => handleRemoveNew(idx)}
                    className="absolute top-0 right-0 bg-black/60 text-white text-xs p-1 opacity-0 group-hover:opacity-100 hover:bg-red-600 cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

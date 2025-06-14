import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { toast } from 'react-toastify';

const ImageUploader = ({ images, setImages }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => formData.append('images', file)); // match multer field name

    try {
      // const { data } = await axios.post('/api/upload', formData, {
      const { data } = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setImages((prev) => [...prev, ...data.imageUrls]); // append uploaded images
      toast.success('Images uploaded!');
    } catch (error) {
      toast.error('Upload failed');
      console.error(error);
    }
  }, [setImages]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-400 p-6 rounded cursor-pointer text-center hover:border-blue-500 transition"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop images here ...</p>
        ) : (
          <p>Drag & drop images here, or click to select</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {images.map((imgUrl, index) => (
          <img
            key={index}
            src={imgUrl}
            alt={`preview-${index}`}
            className="w-24 h-24 object-cover border rounded"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;

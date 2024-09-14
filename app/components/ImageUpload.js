import { useState } from 'react';

export default function ImageUpload({ onImageUpload }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  return (
    <div
      className={`upload-area p-5 border border-dashed rounded ${
        dragActive ? 'bg-light' : ''
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleChange}
        className="d-none"
      />
      <label
        htmlFor="image-upload"
        className="btn btn-success btn-lg d-block mx-auto mb-3"
      >
        Upload Image
      </label>
      <p className="text-center mb-0">
        {dragActive ? 'Drop the image here' : 'or drag and drop image here'}
      </p>
    </div>
  );
}
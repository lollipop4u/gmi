'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import PlantInfo from './components/PlantInfo';
import ImageUpload from './components/ImageUpload';
import CameraCapture from './components/CameraCapture';
import { identifyPlant } from './utils/geminiApi';

export default function Home() {
  const [plantInfo, setPlantInfo] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageCapture = async (imageBlob) => {
    setIsLoading(true);
    setError(null);
    try {
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      const result = await identifyPlant(imageBlob);
      setPlantInfo(result);
    } catch (error) {
      setError('Error identifying plant. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-12 mb-4">
        <div className="alert alert-success" role="alert">
          <h4 className="alert-heading">Welcome to Plant Identifier!</h4>
          <p>Discover the wonders of nature by identifying plants using our advanced AI. Simply upload an image or use your camera to capture a plant, and we'll provide you with detailed information about it.</p>
        </div>
      </div>
      <div className="col-md-6 mb-4">
        <ImageUpload onImageUpload={handleImageCapture} />
        <CameraCapture onCapture={handleImageCapture} />
        {imageUrl && (
          <div className="mt-4">
            <Image
              src={imageUrl}
              alt="Captured plant"
              width={300}
              height={300}
              className="img-fluid rounded border border-success"
            />
          </div>
        )}
      </div>
      <div className="col-md-6">
        {isLoading && <p>Identifying plant...</p>}
        {error && <p className="text-danger">{error}</p>}
        {plantInfo && <PlantInfo info={plantInfo} />}
      </div>
    </div>
  );
}

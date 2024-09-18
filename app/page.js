'use client';

import { useState } from 'react';
import Image from 'next/image';
import PlantInfo from './components/PlantInfo';
import ImageUpload from './components/ImageUpload';
import { identifyPlant } from './utils/geminiApi';

export default function Home() {
  const [plantInfo, setPlantInfo] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (file) => {
    setIsLoading(true);
    setError(null);
    try {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);

      const result = await identifyPlant(file);
      setPlantInfo(result);
    } catch (error) {
      setError('Error identifying plant. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-8">
        <div className="card shadow-lg mb-4">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Welcome to PlantPal</h2>
            <p className="lead text-center mb-4">
              Discover the wonders of nature by identifying plants using our advanced AI. Simply upload an image, and we&apos;ll provide you with detailed information about the plant.
            </p>
            <ImageUpload onImageUpload={handleImageUpload} />
          </div>
        </div>

        {imageUrl && (
          <div className="card shadow-lg mb-4">
            <div className="card-body text-center">
              <Image
                src={imageUrl}
                alt="Uploaded plant"
                width={300}
                height={300}
                className="img-fluid rounded plant-image"
              />
            </div>
          </div>
        )}

        {isLoading && (
          <div className="text-center">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Identifying plant...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {plantInfo && <PlantInfo info={plantInfo} />}
      </div>
    </div>
  );
}￼Enter

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
    <div className="row">
      <div className="col-md-6 mb-4">
        <ImageUpload onImageUpload={handleImageUpload} />
        {imageUrl && (
          <div className="mt-4">
            <Image
              src={imageUrl}
              alt="Uploaded plant"
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
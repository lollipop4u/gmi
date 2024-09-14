// app/components/CameraCapture.js
import { useState, useRef } from 'react';

export default function CameraCapture({ onCapture }) {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async (facingMode = 'environment') => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode }
      });
      videoRef.current.srcObject = stream;
      setIsCameraActive(true);
      setError(null);
    } catch (err) {
      console.error("Error accessing the camera: ", err);
      if (err.name === 'NotAllowedError') {
        setError('Camera access denied. Please enable camera access in your browser settings and try again.');
      } else if (err.name === 'NotFoundError') {
        setError('No camera found. Please make sure your device has a camera and try again.');
      } else {
        setError('An error occurred while trying to access the camera. Please try again.');
      }
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    setIsCameraActive(false);
    setError(null);
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob(onCapture, 'image/jpeg');
    stopCamera();
  };

  return (
    <div className="mb-3">
      {!isCameraActive ? (
        <div>
          <button className="btn btn-primary me-2 mb-2" onClick={() => startCamera('environment')}>
            Use Back Camera
          </button>
          <button className="btn btn-secondary mb-2" onClick={() => startCamera('user')}>
            Use Front Camera
          </button>
          {error && (
            <div className="alert alert-danger mt-2" role="alert">
              {error}
              <hr />
              <p className="mb-0">
                To enable camera access:
                <ol>
                  <li>Click the camera icon in your browser's address bar.</li>
                  <li>Select "Always allow" for this site.</li>
                  <li>Refresh the page and try again.</li>
                </ol>
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <video ref={videoRef} autoPlay playsInline className="w-100 mb-2" />
          <button className="btn btn-success me-2 mb-2" onClick={captureImage}>Capture</button>
          <button className="btn btn-danger mb-2" onClick={stopCamera}>Cancel</button>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
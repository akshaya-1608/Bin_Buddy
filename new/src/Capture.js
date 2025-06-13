import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cropper from 'react-easy-crop';
import getCroppedImg from './utils/cropImage'


const CapturePage = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cropping, setCropping] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);
  const navigate = useNavigate();

  const capture = () => {
    const screenshot = webcamRef.current.getScreenshot();
    setImage(screenshot);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropDone = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(image, croppedAreaPixels);
      setCroppedImage(croppedImg);
      setCropping(false);
    } catch (e) {
      console.error(e);
    }
  }, [image, croppedAreaPixels]);

  const saveAndProceed = async () => {
    setLoading(true);
    try {
      const finalImage = croppedImage || image;
      const response = await axios.post('http://localhost:5000/predict', {
        image: finalImage,
      });
      const result = response.data;
      navigate('/result', { state: { result, image: finalImage } });
    } catch (error) {
      console.error('Error sending image:', error);
      navigate('/result', {
        state: {
          result: { error: 'Prediction failed. Please try again.' },
          image,
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>BinBuddy</h1>
        <p style={styles.tagline}>Snap it. Sort it. Save the Planet 🌍</p>
      </div>

      <div style={styles.content}>
        {!image ? (
          <>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: 'environment' }}
              style={styles.webcam}
            />

            <button style={styles.button} onClick={capture}>
              📷 Take a Picture
            </button>

            <label style={{ ...styles.button, ...styles.uploadLabel }}>
              📁 Upload from Gallery
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleUpload}
              />
            </label>
          </>
        ) : cropping ? (
          <>
            <div style={styles.cropContainer}>
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="rect"
                showGrid={true}
                restrictPosition={false}
                objectFit="contain"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <button style={styles.button} onClick={handleCropDone}>✅ Done</button>
          </>
        ) : (
          <>
            <img src={croppedImage || image} alt="Captured" style={styles.captured} />
            <p style={styles.caption}>Here's what you captured 👆</p>

            <button style={styles.button} onClick={() => setCropping(true)}>
              ✂️ Crop / Edit
            </button>

            <button style={styles.button} onClick={saveAndProceed}>
              ✅ Save & Proceed
            </button>

            <button
              style={styles.retakeButton}
              onClick={() => {
                setImage(null);
                setCroppedImage(null);
              }}
            >
              🔁 Retake / Choose Another
            </button>
          </>
        )}

        {loading && <p style={styles.loading}>⏳ Verifying your image...</p>}
      </div>
    </div>
  );
};

const styles = {
  page: {
    height: '100vh',
    fontFamily: "'Poppins', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(#f0fdf4, #ffffff)',
  },
  header: {
    height: '25vh',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    marginBottom: '5px',
  },
  tagline: {
    fontSize: '17px',
    fontWeight: '300',
  },
  content: {
    flex: 1,
    marginTop: '-20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: '30px',
  },
  webcam: {
    width: '90%',
    maxWidth: '400px',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    marginTop: '30px',
  },
  cropContainer: {
    position: 'relative',
    width: '90%',
    height: '400px',
    background: '#333',
    marginTop: '20px',
  },
  button: {
    marginTop: '20px',
    padding: '12px 25px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    cursor: 'pointer',
    textAlign: 'center',
  },
  uploadLabel: {},
  retakeButton: {
    marginTop: '20px',
    padding: '10px 22px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    cursor: 'pointer',
  },
  captured: {
    marginTop: '20px',
    width: '90%',
    maxWidth: '400px',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
  },
  caption: {
    marginTop: '10px',
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#444',
  },
  loading: {
    marginTop: '20px',
    fontSize: '16px',
    color: '#555',
  },
};

export default CapturePage;
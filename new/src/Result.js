import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import tipsByClass from './Tips';
import VideoGallery from './VideoGallery';

const recyclableItems = ['glass', 'metal', 'cardboard', 'paper', 'plastic'];

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, image } = location.state || {};

  if (!result || !image) {
    return (
      <div style={styles.page}>
        <h2>⚠️ Oops! Something went wrong.</h2>
        <button style={styles.button} onClick={() => navigate('/')}>
          🔁 Try Again
        </button>
      </div>
    );
  }

  const isConfident = result.prediction_type === 'single';
  const prediction = result.class?.toLowerCase() || '';
  const confidence = result.confidence;
  const top3 = result.predictions || [];
  const isRecyclable = recyclableItems.includes(prediction);
  const tips = tipsByClass[prediction];

  const handleDisposalRedirect = () => {
    navigate('/dispose', { state: { category: prediction } });
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>♻️ BinBuddy Prediction</h1>
      <img src={image} alt="Uploaded" style={styles.image} />

      {result.error ? (
        <p style={styles.error}>{result.error}</p>
      ) : (
        <>
          {isConfident ? (
            <p style={styles.prediction}>
              Predicted: <strong>{prediction}</strong> <br />
              Confidence: <strong>{(confidence * 100).toFixed(2)}%</strong>
            </p>
          ) : (
            <div style={styles.prediction}>
              🤔 Not confident. Here are the top 3 guesses:
              <ul style={styles.list}>
                {top3.map((item, index) => (
                  <li key={index}>
                    {item.class} – {(item.confidence * 100).toFixed(2)}%
                  </li>
                ))}
              </ul>
              <p style={styles.uncertain}>
                🧠 I’m not 100% sure — please double-check before disposing!
              </p>
            </div>
          )}

          {isConfident && (
            <p style={isRecyclable ? styles.recyclable : styles.trash}>
              {isRecyclable ? '✅ This item is recyclable!' : '❌ This item is trash.'}
            </p>
          )}

          <div style={styles.tipsContainer}>
            {tips ? (
              <>
                <h3>{tips.label}</h3>
                <p>{tips.recyclability}</p>
                <ul style={styles.tipsList}>
                  {tips.tips.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p style={{ fontStyle: 'italic', color: '#888' }}>
                No tips available for this item.
              </p>
            )}
          </div>
        </>
      )}

      <button style={styles.button} onClick={() => navigate('/')}>
        🔁 Try Again
      </button>

      {isConfident && (
        <>
          {prediction === 'organic' ? (
            <>
              <button
                style={{ ...styles.button, backgroundColor: '#8BC34A' }}
                onClick={() =>
                  window.open(
                    'https://www.youtube.com/results?search_query=how+to+compost',
                    '_blank'
                  )
                }
              >
                🌿 See How to Compost
              </button>
              {/* Show VideoGallery only for organic */}
              <VideoGallery />
            </>
          ) : (
            <button
              style={{ ...styles.button, backgroundColor: '#2196F3' }}
              onClick={handleDisposalRedirect}
            >
              📍 See where to Dispose
            </button>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Poppins', sans-serif",
    textAlign: 'center',
    padding: '30px 20px',
    background: 'linear-gradient(#f0fdf4, #ffffff)',
    minHeight: '100vh',
  },
  title: {
    fontSize: '26px',
    marginBottom: '20px',
    color: '#4CAF50',
  },
  image: {
    maxWidth: '300px',
    width: '90%',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    marginBottom: '20px',
  },
  prediction: {
    fontSize: '18px',
    marginBottom: '15px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    marginTop: '10px',
  },
  tipsContainer: {
    backgroundColor: '#f1f8e9',
    marginTop: '20px',
    padding: '15px',
    borderRadius: '10px',
    textAlign: 'left',
    maxWidth: '400px',
    margin: '20px auto',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  tipsList: {
    paddingLeft: '20px',
    fontSize: '15px',
  },
  uncertain: {
    color: '#ff9800',
    fontStyle: 'italic',
    marginTop: '10px',
  },
  recyclable: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  trash: {
    color: '#c62828',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  button: {
    marginTop: '25px',
    marginLeft: '10px',
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  error: {
    color: '#c62828',
    fontWeight: 'bold',
    fontSize: '18px',
  },
};

export default ResultPage;

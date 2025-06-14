import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import tipsByClass from './Tips';
import VideoGallery from './VideoGallery';
import Quiz from './Quiz';

const recyclableItems = ['glass', 'metal', 'cardboard', 'paper', 'plastic'];

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, image } = location.state || {};
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  if (!result || !image) {
    return (
      <div style={styles.page}>
        <h2>⚠ Oops! Something went wrong.</h2>
        <button style={styles.button} onClick={() => navigate('/capture')}>
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

  const handleDisposalRedirect = (category = prediction) => {
    navigate('/dispose', { state: { category } });
  };

  if (showQuiz) {
    return (
      <div style={styles.page}>
        <Quiz onBack={() => setShowQuiz(false)} />
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>♻ BinBuddy Prediction</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <img src={image} alt="Uploaded" style={styles.image} />
        </div>
        <div style={{ marginRight: '-5px' }}>
          <button style={styles.quizButton} onClick={() => setShowQuiz(true)}>
            Play Quiz
          </button>
        </div>
      </div>

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

          {!isConfident && top3[0]?.confidence < 0.6 && (
            <div style={styles.dropdownContainer}>
              <label htmlFor="manual-category" style={styles.dropdownLabel}>
                🤖 I'm unsure — select a category manually:
              </label>
              <select
                id="manual-category"
                style={styles.dropdown}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">-- Choose Category --</option>
                <option value="cardboard">Cardboard</option>
                <option value="e-waste">E-waste</option>
                <option value="glass">Glass</option>
                <option value="metal">Metal</option>
                <option value="organic">Organic</option>
                <option value="paper">Paper</option>
                <option value="plastic">Plastic</option>
              </select>
            </div>
          )}
        </>
      )}

      <div style={styles.buttonRow}>
  <button style={styles.button} onClick={() => navigate('/capture')}>
    🔁 Try Again
  </button>

  {(isConfident && prediction === 'organic') && (
    <button
      style={{ ...styles.button, backgroundColor: '#03A9F4' }}
      onClick={() =>
        window.open(
          'https://www.youtube.com/results?search_query=how+to+compost',
          '_blank'
        )
      }
    >
      🌿 See How to Compost
    </button>
  )}

  {(isConfident && prediction !== 'organic') || (!isConfident && top3[0]?.confidence < 0.6 && selectedCategory) ? (
    <button
      style={{ ...styles.button, backgroundColor: '#2196F3' }}
      onClick={() =>
        handleDisposalRedirect(isConfident ? prediction : selectedCategory)
      }
    >
      📍 See where to Dispose
    </button>
  ) : null}
</div>


      {isConfident && prediction === 'organic' && <VideoGallery />}
    </div>
  );
};

const styles = {
  page: {
    fontFamily: "'Poppins', sans-serif",
    position: 'relative',
    textAlign: 'center',
    padding: '30px 20px',
    background: 'linear-gradient(#f0fdf4, #ffffff)',
    minHeight: '100vh',
  },
  title: {
    fontSize: '26px',
    marginBottom: '20px',
    color: '#4caf50',
  },
  image: {
    maxWidth: '300px',
    width: '90%',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    marginBottom: '20px',
  },
  quizButton: {
    padding: '12px 24px',
    backgroundColor: '#03A9F4',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    width: '150px',
    height: '60px',
    position: 'absolute',
    top: '80px',
    right: '130px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
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
buttonGroup: {
  marginTop: '30px',
  display: 'flex',
  justifyContent: 'center',
  gap: '16px', // or use marginRight on individual buttons
  flexWrap: 'wrap', // allows it to wrap on small screens
},
  buttonRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
    marginTop: '10px',
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    minWidth: '180px',
    transition: 'background-color 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    color: '#c62828',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  dropdownContainer: {
    backgroundColor: '#e8f5e9',
    padding: '15px',
    borderRadius: '10px',
    maxWidth: '300px',
    margin: '20px auto',
    textAlign: 'left',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  dropdownLabel: {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  dropdown: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '15px',
  },
};

export default ResultPage;

import React from 'react';

const videoIds = [
  "U5LzlJnHi-w", "zczzEtDEw9c", "oUdWIFu3kDw",
  "eFlhYS-_tpY", "qwKc13R-bMc", "VpZ3fp2HOfI",
  "CHBJkc7kvZ0", "97EyeKoA-ew", "_K25WjjCBuw" // no dummy ID
]; 

const VideoGallery = () => {
  const galleryStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginTop: '30px',
    padding: '10px',
    backgroundColor: '#000',
    borderRadius: '10px',
    color: 'white',
    textAlign: 'center',
  };

  const iframeStyle = {
    width: '100%',
    aspectRatio: '16 / 9',
    borderRadius: '8px',
  };

  return (
    <div style={galleryStyle}>
      <h2 style={{ gridColumn: '1 / -1', color: 'red', fontSize: '24px', fontWeight: 'bold' }}>
        How to Compost – Video Guide
      </h2>
      {videoIds.map((id, index) => (
        <iframe
          key={index}
          style={iframeStyle}
          src={`https://www.youtube.com/embed/${id}`}
          title={`YouTube video ${index + 1}`}
          allowFullScreen
        />
      ))}
    </div>
  );
};

export default VideoGallery;

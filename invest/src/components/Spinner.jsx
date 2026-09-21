import React from 'react';

export const Spinner = ({ size = 24, color = '#e5b82f' }) => {
  return (
    <div className="spinner-container" style={{ display: 'inline-block', verticalAlign: 'middle', marginLeft: '8px' }}>
      <div className="custom-spinner" style={{ width: size, height: size, borderColor: `rgba(229, 184, 47, 0.2)`, borderLeftColor: color }}></div>
      <style>{`
        .custom-spinner {
          border: 3px solid;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

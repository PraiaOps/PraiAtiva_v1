import React from 'react';
import './AnimatedWave.css';

const AnimatedWave = () => {
  return (
    <div className="wave-container">
      <svg className="wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
        <defs>
          {/* Path original, porém duplicado para garantir o loop infinito */}
          <path id="wave-path" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-704z" />
        </defs>
        <g>
          {/* Cores originais */}
          <use xlinkHref="#wave-path" className="wave-3" x="50" y="0" fill="#0c4a6e" />
          <use xlinkHref="#wave-path" className="wave-2" x="50" y="3" fill="#0284c7" />
          <use xlinkHref="#wave-path" className="wave-1" x="50" y="5" fill="#0ea5e9" />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedWave;

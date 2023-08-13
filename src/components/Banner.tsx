import React, { useState, useEffect } from 'react';
import '../assets/styles/components/Banner.css';

type BannerType = 'error' | 'success' | 'info';

interface BannerProps {
  type: BannerType;
  message: string;
  autoDismissTimeout?: number; // Optional prop for auto dismissal in seconds
}

const Banner: React.FC<BannerProps> = ({ type, message, autoDismissTimeout }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (autoDismissTimeout) {
      const timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, autoDismissTimeout * 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [autoDismissTimeout]);

  return isVisible ? (
    <div className={`banner ${type}`}>
      <p className="banner-message">{message}</p>
      <button className="banner-close" onClick={handleClose}>
        Close
      </button>
    </div>
  ) : null;
};

export default Banner;
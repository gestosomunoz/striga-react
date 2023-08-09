import React, { useState, useEffect } from 'react';
import '../assets/styles/Invoice.css'; // Import the minimalist CSS file

function Invoice() {
  const [countdown, setCountdown] = useState(10 * 60); // 10 minutes in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const copyCodeToClipboard = () => {
    // Logic to copy code to clipboard
  };

  return (
    <div className="invoice-container">
      <h1>Almost done</h1>
      <p className="sub-title">You can use http://htlc.me for paying for the testnet </p>
      {/* QR-CODE */}
      <div className="qr-code"></div>
      <div className="countdown-timer">Expires in {Math.floor(countdown / 60)} minutes {countdown % 60} seconds</div>
      <div className="code-container">
        <span className="code">ABC123XYZ</span>
        <button className="copy-button" onClick={copyCodeToClipboard}>Copy</button>
      </div>
    </div>
  );
}

export default Invoice;

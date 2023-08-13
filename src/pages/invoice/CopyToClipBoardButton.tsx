import React, { useState } from 'react';
import '../../assets/styles/invoice/CopyToClipboardButton.css'

interface CopyToClipboardButtonProps {
  value: string;
}

function CopyToClipboardButton({ value }: CopyToClipboardButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
      .then(() => {
        setIsCopied(true);

        // Automatically hide the message after 5 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
  };

  return (
    <div>
      <button className="copy-button" onClick={copyToClipboard}>Copy</button>
      {isCopied && <div className="copy-message">Copied</div>}
    </div>
  );
}

export default CopyToClipboardButton;
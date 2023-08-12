import { useState, useEffect, useRef } from 'react';
import '../assets/styles/Invoice.css'; // Import the minimalist CSS file
import * as qrcode from 'qrcode'
import apiService from '../api/ApiService';

function Invoice() {
  const [countdown, setCountdown] = useState(10 * 60); // 10 minutes in seconds
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState('');
  const invoiceDataRef = useRef(invoiceData);

  interface InvoiceData {
    transactionId: string; // Adjust the type as needed
    invoice: string;
  }

  useEffect(() => {
    // Store the latest invoiceData in the ref
    invoiceDataRef.current = invoiceData;
  }, [invoiceData]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      }
      const currentInvoiceData = invoiceDataRef.current;

      if (currentInvoiceData && countdown % 5 === 0) {
        try{
          console.log('id:' + currentInvoiceData.transactionId)
          const response = await apiService.getTransactionState(currentInvoiceData.transactionId);
          console.log('RESPONSE:', response)
        } catch (error) {
          console.error('Error', error);
        }
        
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    async function createQRCode(data: string) {
      console.log('creating QRCode', data)
      const qrCodeImageData = await qrcode.toDataURL(data);
      setQrCodeImage(qrCodeImageData)
    } 

    const storedData = localStorage.getItem('invoiceData');

    if (storedData) {
      const invoiceStored = JSON.parse(storedData)
      setInvoiceData(invoiceStored);
      createQRCode(invoiceStored.invoice);
    }
  }, []);

  const copyCodeToClipboard = () => {
    // Logic to copy code to clipboard
  };

  return (
    <div className="invoice-container">
      <h1>Status: <span> </span></h1>
      
      <p className="sub-title">You can use http://htlc.me for paying for the testnet </p>
      <div className="qr-code">
        {qrCodeImage && (
          <img src={qrCodeImage} alt="QR Code" />
        )}
      </div>
      <div className="countdown-timer">Expires in {Math.floor(countdown / 60)} minutes {countdown % 60} seconds</div>
      <div className="code-container">
        <input className="invoice-code" value={invoiceData?.invoice}></input>
        <button className="copy-button" onClick={copyCodeToClipboard}>Copy</button>
      </div>
    </div>
  );
}

export default Invoice;

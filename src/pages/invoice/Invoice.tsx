import { useState, useEffect, useRef } from 'react';
import '../../assets/styles/invoice/Invoice.css';
import * as qrcode from 'qrcode'
import apiService from '../../api/ApiService';
import CopyToClipboardButton from './CopyToClipBoardButton';
import { useNavigate } from 'react-router-dom';

function Invoice() {
  const [countdown, setCountdown] = useState(10 * 60);
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState('');
  const invoiceDataRef = useRef(invoiceData);
  const navigate = useNavigate();

  interface InvoiceData {
    transactionId: string;
    invoice: string;
    expiry: number;
  }

  async function getTransactionState(currentInvoiceData: InvoiceData) {
    try {
      const response = await apiService.getTransactionState(currentInvoiceData.transactionId);
      if (response.transactionState === 'EXPIRED') {
        navigate('/confirmation', { state: { success: false } });
      } else if (response.transactionState === 'PAID') {
        navigate('/confirmation', { state: { success: true } });
      }
    } catch (error) {
      console.error('Error', error);
    }
  }

  function getInitialTimer(expiryTimestamp: number): number {
    const expiryDate: Date = new Date(expiryTimestamp * 1000);
    const timeDifference = expiryDate.getTime() - new Date().getTime();
    return Math.floor(timeDifference / 1000);
  }

  useEffect(() => {
    invoiceDataRef.current = invoiceData;
  }, [invoiceData]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        navigate('/confirmation', { state: { success: false } });
      }

      const currentInvoiceData = invoiceDataRef.current;

      if (currentInvoiceData && countdown % 5 === 0) {
        await getTransactionState(currentInvoiceData);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown, navigate]);

  useEffect(() => {
    async function createQRCode(data: string) {
      const qrCodeImageData = await qrcode.toDataURL(data);
      setQrCodeImage(qrCodeImageData)
    }

    const storedData = localStorage.getItem('invoiceData');

    if (storedData) {
      const invoiceStored = JSON.parse(storedData)
      setInvoiceData(invoiceStored);
      const initialCountdown = getInitialTimer(invoiceStored.expiry);
      if (initialCountdown > 0) {
        setCountdown(initialCountdown);
      } else {
        navigate('/confirmation', { state: { success: false } });
      }
      createQRCode(invoiceStored.invoice);
    }
  }, []);


  return (
    <div className="invoice-container">
      <h1>Almost done!</h1>

      <p className="sub-title">You can use <a href="http://htlc.me">http://htlc.me</a> for paying for the testnet invoice</p>
      <div className="qr-code-container">
        {qrCodeImage && (
          <img src={qrCodeImage} alt="QR Code" />
        )}
      </div>
      <div className="countdown-timer">Expires in {Math.floor(countdown / 60)} minutes {countdown % 60} seconds</div>
      {invoiceData &&
        <>
          <div className="order-id">Order id: {invoiceData!.transactionId}</div>
          <div className="code-container">
            <input className="invoice-code" value={invoiceData!.invoice} readOnly></input>
            <CopyToClipboardButton value={invoiceData!.invoice} />
          </div>
        </>
      }
    </div>
  );
}

export default Invoice;

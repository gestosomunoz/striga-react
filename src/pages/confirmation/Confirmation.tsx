import React, { useState, useEffect, useRef } from 'react';
import '../../assets/styles/confirmation/Confirmation.css'; // Import the provided CSS file
import apiService from '../../api/ApiService';
import { useLocation, useNavigate } from 'react-router-dom';


function Confirmation() {
  const [userBalance, setUserBalance] = useState(0);
  const success = useRef(true);
  const navigate = useNavigate();
  const location = useLocation();

  async function getCurrentBalance() {
    const response = await apiService.getCurrentBalance();
    setUserBalance(response.balance);
  }

  useEffect(() => {
    getCurrentBalance();
    success.current = location.state?.success ?? false;
  }, [location]);

  function makeAnotherOperation(): void {
    navigate('/');
  }

  return (
    <div className="confirmation-container">
      <h1 className="confirmation-header">
        {success.current ? 'Transaction Confirmed!' : 'Transaction Expired'}
      </h1>
      <p className="confirmation-content">Your latest balance: {userBalance} BTC</p>
      <button onClick={makeAnotherOperation}>Make another operation</button>
    </div>
  );
}

export default Confirmation;


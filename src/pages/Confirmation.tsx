import React, { useState, useEffect } from 'react';
import '../assets/styles/Confirmation.css'; // Import the provided CSS file

function Confirmation() {
  const [userBalance, setUserBalance] = useState(3290);

  /* useEffect(() => {
    // Simulate API call and data fetching
    fetch('your-api-endpoint')
      .then(response => response.json())
      .then(data => {
        setMessage(data.message);
        setUserBalance(data.userBalance);
      })
      .catch(error => console.error(error));
  }, []); // Empty  dependency array means this effect runs once on component mount*/

  return (
    <div className="main-container">
      <h1>Transaction confirmed!</h1>
      <p>Your latest balance: {userBalance}€</p>
    </div>
  );
}

export default Confirmation;

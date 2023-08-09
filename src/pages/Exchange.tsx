import { useEffect, useState } from 'react';
import '../assets/styles/Exchange.css'
import axios from 'axios';


function Exchange() {
    const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);
    const [amountToSell, setAmountToSell] = useState(0);
    const [amountToReceive, setAmountToReceive] = useState(0);
    const [exchangeRates, setExchangeRates] = useState<any | null>(null); // Initialize with null

    const handleAmountToSellChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseFloat(event.target.value);
        setAmountToSell(value);
        // Calculate and set amountToReceive based on your logic here
        const newAmount = exchangeRates ? value / exchangeRates.buy : 0.0;
        setAmountToReceive(newAmount);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/trade/exchange/BTCEUR');
            setExchangeRates(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Fetch data initially
        fetchData();

        // Set up interval to fetch data every 5 seconds
        const interval = setInterval(() => {
            fetchData();
        }, 5000);

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <form>
            <h2>Buy Bitcoin</h2>

            <label htmlFor="amountToSell">
                You pay:
                <div className="input-container">
                    €
                    <input
                        type="number"
                        id="amountToSell"
                        name="amountToSell"
                        className="euro-input"
                        value={amountToSell}
                        onChange={handleAmountToSellChange}
                        required
                        step="0.01"
                        placeholder="0.00"
                    />
                </div>
            </label>
            <label htmlFor="amountToReceive">
                You Receive:
                <div className="input-container">
                    <input
                        type="text"
                        id="amountToReceive"
                        name="amountToReceive"
                        value={amountToReceive.toFixed(2)}
                        readOnly
                    />
                    <span> BTC </span>
                    <span aria-live="polite">--Updates in 5 seconds</span>
                </div>
            </label>

            <label htmlFor="purchaseDetails">
                Summary:
                <div className="input-container">
                    <input
                        id="purchaseDetails"
                        name="purchaseDetails"
                        readOnly
                    />
                    <span onClick={() => setShowPurchaseDetails(!showPurchaseDetails)}> Show purchase details</span>
                </div>
            </label>
            {showPurchaseDetails && (
                <div className="purchase-details">
                    Purchase details
                </div>
            )}

            <button type="submit" className="btn">Submit</button>
        </form>
    );
}
export default Exchange;
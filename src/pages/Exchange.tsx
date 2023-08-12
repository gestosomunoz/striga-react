import { useEffect, useState } from 'react';
import '../assets/styles/Exchange.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiService from '../api/ApiService';


function Exchange() {
    const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);
    const [amountToSell, setAmountToSell] = useState(0);
    const [amountToReceive, setAmountToReceive] = useState(0);
    const [exchangeRates, setExchangeRates] = useState<any | null>(null); 
    const navigate = useNavigate();

    function handleAmountToSellChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const value = parseFloat(event.target.value);
        setAmountToSell(value);
        // Calculate and set amountToReceive based on your logic here
        console.log(exchangeRates)
        const newAmount = exchangeRates ? value / exchangeRates.buy : 0.0;
        setAmountToReceive(newAmount);
    };

    async function onSubmitClick(event: any) {
        event.preventDefault();
        console.log('SUBMIT CLICKED')
        try{
            const response = await apiService.createBTCTransaction(amountToReceive)
            console.log('Post successful: ', response);
            localStorage.setItem('invoiceData', JSON.stringify(response))
            navigate('/invoice')
        } catch (error) {
            console.error('Error', error);
        }
    }

    const fetchData = async () => {
        try {
            const response = await apiService.getBTCEURExchangeRate();
            setExchangeRates(response);
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
                        value={amountToReceive}
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
                    <span> Show purchase details</span>
                </div>
            </label>
            {showPurchaseDetails && (
                <div className="purchase-details">
                    Purchase details
                </div>
            )}

            <button  onClick={onSubmitClick} type="submit" className="btn">Submit</button>
        </form>
    );
}
export default Exchange;
import { useEffect, useState } from 'react';
import '../../assets/styles/exchange/Exchange.css'
import { useNavigate } from 'react-router-dom';
import apiService from '../../api/ApiService';
import TransactionSummary from './TransactionSummary';


function Exchange() {
    const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);
    const [currentBalance, setCurrentBalance] = useState(0);
    const [amountToPay, setAmountToPay] = useState(0);
    const [amountToReceive, setAmountToReceive] = useState(0);
    const [exchangeRates, setExchangeRates] = useState<any | null>(null); 
    const navigate = useNavigate();

    function handleAmountToPayChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const value = parseFloat(event.target.value);
        setAmountToPay(value);
        // Calculate and set amountToReceive based on your logic here
        if (!isNaN(value)) {
            const newAmount = exchangeRates ? value / exchangeRates.buy : 0.0;
            setAmountToReceive(newAmount);
        } else {
            setAmountToReceive(0);
        }
        
    };

    async function onSubmitClick(event: any) {
        event.preventDefault();
        try {
            const response = await apiService.createBTCTransaction(amountToReceive)
            localStorage.setItem('invoiceData', JSON.stringify(response))
            navigate('/invoice')
        } catch (error) {
            console.error('Error', error);
        }
    }

    function onShowDetailsClick(event: any) {
        event.preventDefault();
        setShowPurchaseDetails(!showPurchaseDetails);
    }

    async function fetchExchangeRate() {
        try {
            const response = await apiService.getBTCEURExchangeRate();
            setExchangeRates(response);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    async function getCurrentBalance() {
        const response = await apiService.getCurrentBalance();
        setCurrentBalance(response.balance);
    }

    useEffect(() => {
    }, [])

    useEffect(() => {
        getCurrentBalance();
        fetchExchangeRate();

        const interval = setInterval(() => {
            fetchExchangeRate();
        }, 5000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <form className="exchange-form">
            <h2>Buy Bitcoin</h2>

            <label htmlFor="amountToPay" className="exchange-label">
                You pay:
                <div className="input-container">
                    €
                    <input
                        type="number"
                        id="amountToPay"
                        name="amountToPay"
                        className="euro-input"
                        value={amountToPay}
                        onChange={handleAmountToPayChange}
                        required
                        step="1"
                        placeholder="0.00"
                    />
                </div>
            </label>
            <label htmlFor="amountToReceive" className="exchange-label">
                You Receive:
                <div className="input-container">
                    <input
                        type="text"
                        id="amountToReceive"
                        name="amountToReceive"
                        value={amountToReceive + " BTC"}
                        readOnly
                    />
                    <span>Updates every 5 seconds</span>
                </div>
            </label>

            <label htmlFor="purchaseDetails" className="exchange-label">
                Summary:
                <div className="input-container">
                    <input
                        id="purchaseDetails"
                        name="purchaseDetails"
                        readOnly
                        value={!isNaN(amountToPay) ? `You pay €${amountToPay} and get ~${amountToReceive} BTC` : ''} 
                        className='summary-input'
                    />
                    <span onClick={onShowDetailsClick} className="show-summary"> {showPurchaseDetails ? "Hide" : "Show"} purchase details</span>
                </div>
            </label>
            {showPurchaseDetails && <TransactionSummary currentBalance={currentBalance} amountToPay={isNaN(amountToPay) ? 0 : amountToPay} amountToReceive={amountToReceive}/>}

            <button  onClick={onSubmitClick} type="submit" className="btn">Submit</button>
        </form>
    );
}
export default Exchange;
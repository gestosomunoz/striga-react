import { useState } from 'react';
import '../assets/styles/Exchange.css'
function Exchange() {
    const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);
    const [amountToSell, setAmountToSell] = useState(0);
    const [amountToReceive, setAmountToReceive] = useState(0);

    const handleAmountToSellChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = parseFloat(event.target.value);
        setAmountToSell(value);
        // Calculate and set amountToReceive based on your logic here
        const exchangeRate = 42398;
        setAmountToReceive(exchangeRate * value);
    };

    return (
        <form>
            <h2>Sell Bitcoin</h2>

            <label htmlFor="amountToSell">
                You sell (BTC):
                <div className="input-container">
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
                    <span> BTC </span>
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
                    <span aria-live="polite">Updates in 5 seconds</span>
                </div>
            </label>

            <fieldset>
                <legend>Summary</legend>
                <div>
                    <label htmlFor="purchaseDetails">
                        Show Purchase Details:
                        <input
                            type="checkbox"
                            id="purchaseDetails"
                            name="purchaseDetails"
                            checked={showPurchaseDetails}
                            onChange={() => setShowPurchaseDetails(!showPurchaseDetails)}
                        />
                    </label>
                </div>
                {showPurchaseDetails && (
                    <div>
                        {/* Add purchase details content here */}
                    </div>
                )}
            </fieldset>

            <button type="submit" className="btn">Submit</button>
        </form>
    );
}
export default Exchange;
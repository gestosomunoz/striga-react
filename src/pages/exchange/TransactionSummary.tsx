import '../../assets/styles/exchange/TransactionSummary.css'

interface TransactionSummaryProps {
  currentBalance: number;
  amountToPay: number;
  amountToReceive: number;
}

const TransactionSummary: React.FC<TransactionSummaryProps> = ({ currentBalance, amountToPay, amountToReceive }) => {
  function calculateNewBalance() {
    return currentBalance + amountToReceive;
  }
  return (
    <div className="transaction-summary"> 
      <p className="summary-row">Your current balance: {currentBalance} BTC</p>
      <p className="summary-row">To pay: €{amountToPay}</p>
      <p className="summary-row">Balance after: {calculateNewBalance()} BTC</p>
    </div>
  );
};

export default TransactionSummary;

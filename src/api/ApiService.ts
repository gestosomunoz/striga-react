import axios from "axios";
import { IApiService } from "./IApiService";
import { ExchangeRateResponse, TransactionStateResponse, CreateTransactionResponse } from "./ApiResponseTypes";

class ApiService implements IApiService {
    private backendUrl: string = 'http://localhost:8000';

    async createBTCTransaction(amount: number): Promise<CreateTransactionResponse> {
        const body = {
            amount: amount
        }
        const response = await axios.post(this.backendUrl + '/transaction/topup', body);
        return response.data;
    }

    async getBTCEURExchangeRate(): Promise<ExchangeRateResponse> {
        const currencies = 'BTCEUR'
        const response = await axios.get(this.backendUrl + '/trade/exchange/' + currencies);
        return response.data;
    }

    async getTransactionState(transactionId: string): Promise<TransactionStateResponse> {
        const response = await axios.post(this.backendUrl + '/transaction/' + transactionId);
        return response.data;
    }
}

const apiService: IApiService = new ApiService();

export default apiService;
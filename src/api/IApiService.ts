import {ExchangeRateResponse, TransactionStateResponse, CreateTransactionResponse, AccountBalanceResponse } from "./ApiResponseTypes";

export interface IApiService {
    getCurrentBalance(): Promise<AccountBalanceResponse>;
    createBTCTransaction(amount: number): Promise<CreateTransactionResponse>;
    getBTCEURExchangeRate(): Promise<ExchangeRateResponse>;
    getTransactionState(transactionId: string): Promise<TransactionStateResponse>;
}
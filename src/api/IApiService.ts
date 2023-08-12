import {ExchangeRateResponse, TransactionStateResponse, CreateTransactionResponse } from "./ApiResponseTypes";

export interface IApiService {
    createBTCTransaction(amount: number): Promise<CreateTransactionResponse>;
    getBTCEURExchangeRate(): Promise<ExchangeRateResponse>;
    getTransactionState(transactionId: string): Promise<TransactionStateResponse>;
}
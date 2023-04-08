import { OrdenPago } from "../../domain/models/payment-order.model";
import { paymentOrderRepository } from "../../domain/repositories/payment-order.repository";

interface CreateOrdenPagoParams {
    id: number,
    dateRegist: Date,
    paymentAmount: number,
    idPaymentStatus: number,
    idPaymentType: number,
    idBankAccount: number,
    idUser: number,
    idTypeCurrency: string,
    paymentDate: Date,
    transacctionCode: string,
    accountantNumber: number,
    accountantDate: Date
};

export class CreatePaymentOrderUseCase {
    constructor(private readonly paymentOrderRepository: paymentOrderRepository){}

    public async execute(params: CreateOrdenPagoParams): Promise<void>{
        const {
            id,
            dateRegist,
            paymentAmount,
            idPaymentStatus,
            idPaymentType,
            idBankAccount,
            idUser,
            idTypeCurrency,
            paymentDate,
            transacctionCode,
            accountantNumber,
            accountantDate
        } = params;

        const ordenPago = new OrdenPago(
            id,
            dateRegist,
            paymentAmount,
            idPaymentStatus,
            idPaymentType,
            idBankAccount,
            idUser,
            idTypeCurrency,
            paymentDate,
            transacctionCode,
            accountantNumber,
            accountantDate
        );
        
        this.paymentOrderRepository.create(ordenPago);
    }

}
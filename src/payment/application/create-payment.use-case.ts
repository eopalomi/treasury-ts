import { Payment } from "../domain/model/payment.model";
import { PaymentRepository } from "../domain/repositories/payment.repository";

interface PaymentParams {
    paymentDate: Date,
    referenceCode: string,
    paymentAmount: number,
    idcurrencyType: number,
    paymentType: number,
    idPaymentCategory: number,
    exchangeRate: number,
    idPaymentSubcategory: number
}

export class CreatePaymentUseCase {

    constructor(private payment: PaymentRepository) {};

     createPayment = async (params: PaymentParams):Promise<void> => {
        const payment = new Payment(
            params.paymentDate,
            params.referenceCode,
            params.paymentAmount,
            params.idcurrencyType,
            params.paymentType,
            params.idPaymentCategory,
            params.exchangeRate,
            params.idPaymentSubcategory
        );

       this.payment.create(payment);
    }
    

}